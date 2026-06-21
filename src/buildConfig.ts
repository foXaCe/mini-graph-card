import { log } from './utils';
import { localize } from './localize';
import {
  URL_DOCS,
  FONT_SIZE,
  FONT_SIZE_HEADER,
  MAX_BARS,
  DEFAULT_COLORS,
  DEFAULT_SHOW,
} from './const';
import type {
  ColorThreshold, EntityConfig, MiniGraphCardConfig, RawCardConfig, ShowConfig, StateMapEntry,
} from './types';

// A threshold stop as authored: a bare colour string or an object whose `value`
// may be interpolated. Genuinely loose user input, so typed permissively.
type RawStop = string | { color: string; value?: number | null };

/**
 * Starting from the given index, increment the index until an array element with a
 * "value" property is found.
 */
const findFirstValuedIndex = (stops: RawStop[], startIndex: number): number => {
  for (let i = startIndex, l = stops.length; i < l; i += 1) {
    if ((stops[i] as { value?: number | null }).value != null) {
      return i;
    }
  }
  throw new Error(
    'Error in threshold interpolation: could not find right-nearest valued stop. '
    + 'Do the first and last thresholds have a set "value"?',
  );
};

/**
 * Interpolates the "value" of each stop. Each stop can be a color string or an
 * object of type `{ color: string, value?: number | null }`, and the values
 * will be interpolated by the nearest valued stops.
 *
 * For example, given values `[ 0, null, null, 4, null, 3]`, the interpolation
 * outputs `[ 0, 1.3333, 2.6667, 4, 3.5, 3 ]`. Values are interpolated both
 * ascending and descending; all that's necessary is that the first and last
 * elements have values.
 */
const interpolateStops = (stops: RawStop[]): ColorThreshold[] => {
  if (!stops || !stops.length) {
    return stops as ColorThreshold[];
  }
  const value = (s: RawStop): number | null | undefined => (typeof s === 'string' ? undefined : s.value);
  if (value(stops[0]) == null || value(stops[stops.length - 1]) == null) {
    throw new Error(localize('card.error.thresholds_need_value', null, { url: URL_DOCS }));
  }

  let leftValuedIndex = 0;
  let rightValuedIndex: number | null = null;

  return stops.map((stop, stopIndex) => {
    if (value(stop) != null) {
      leftValuedIndex = stopIndex;
      return { ...(stop as ColorThreshold) };
    }

    if (rightValuedIndex == null) {
      rightValuedIndex = findFirstValuedIndex(stops, stopIndex);
    } else if (stopIndex > rightValuedIndex) {
      leftValuedIndex = rightValuedIndex;
      rightValuedIndex = findFirstValuedIndex(stops, stopIndex);
    }

    // y = mx + b ; m = dY/dX ; x = index in question ; b = left value
    const leftValue = value(stops[leftValuedIndex]) as number;
    const rightValue = value(stops[rightValuedIndex]) as number;
    const m = (rightValue - leftValue) / (rightValuedIndex - leftValuedIndex);
    return {
      color: typeof stop === 'string' ? stop : stop.color,
      value: m * stopIndex + leftValue,
    };
  });
};

const computeThresholds = (stops: RawStop[], type: string): ColorThreshold[] => {
  const valuedStops = interpolateStops(stops);
  valuedStops.sort((a, b) => b.value - a.value);

  if (type === 'smooth') {
    return valuedStops;
  } else {
    const rect = ([] as ColorThreshold[]).concat(...valuedStops.map((stop, i) => ([stop, {
      value: stop.value - 0.0001,
      color: valuedStops[i + 1] ? valuedStops[i + 1].color : stop.color,
    }])));
    return rect;
  }
};

export default (config: RawCardConfig): MiniGraphCardConfig => {
  if (!Array.isArray(config.entities))
    throw new Error(localize('card.error.entities_not_a_list', null, { url: URL_DOCS }));
  if (config.line_color_above || config.line_color_below)
    throw new Error(localize('card.error.line_color_options_removed', null, { url: URL_DOCS }));

  const conf = {
    animate: false,
    hour24: false,
    font_size: FONT_SIZE,
    font_size_header: FONT_SIZE_HEADER,
    height: 100,
    hours_to_show: 24,
    points_per_hour: 0.5,
    aggregate_func: 'avg',
    group_by: 'interval',
    line_color: [...DEFAULT_COLORS],
    color_thresholds: [],
    color_thresholds_transition: 'smooth',
    line_width: 5,
    bar_spacing: 4,
    compress: true,
    smoothing: true,
    state_map: [],
    cache: true,
    value_factor: 0,
    tap_action: {
      action: 'more-info',
    },
    ...JSON.parse(JSON.stringify(config)),
    show: { ...DEFAULT_SHOW, ...(config.show as Partial<ShowConfig>) },
  } as MiniGraphCardConfig;

  (conf.entities as Array<string | EntityConfig>).forEach((entity, i) => {
    if (typeof entity === 'string') conf.entities[i] = { entity };
  });

  (conf.state_map as Array<string | StateMapEntry>).forEach((stateEntry, i) => {
    // convert string values to objects
    if (typeof stateEntry === 'string') conf.state_map[i] = { value: stateEntry, label: stateEntry };
    // make sure label is set
    conf.state_map[i].label = conf.state_map[i].label || conf.state_map[i].value;
  });

  if (typeof config.line_color === 'string')
    conf.line_color = [config.line_color, ...DEFAULT_COLORS];

  conf.font_size = ((config.font_size as number) / 100) * FONT_SIZE || FONT_SIZE;
  conf.color_thresholds = computeThresholds(
    conf.color_thresholds as unknown as RawStop[],
    conf.color_thresholds_transition,
  );
  const additional: Intl.DateTimeFormatOptions = conf.hours_to_show > 24
    ? { day: 'numeric', weekday: 'short' }
    : {};
  const hourFormat: Intl.DateTimeFormatOptions = conf.hour24 ? { hourCycle: 'h23' } : { hour12: true };
  conf.format = { ...hourFormat, ...additional };

  // override points per hour to match group_by function
  switch (conf.group_by) {
    case 'month':
      conf.points_per_hour = 1 / 24;
      break;
    case 'date':
      conf.points_per_hour = 1 / 24;
      break;
    case 'hour':
      conf.points_per_hour = 1;
      break;
    default:
      break;
  }

  if (conf.show.graph === 'bar') {
    const entities = conf.entities.length;
    if (conf.hours_to_show * conf.points_per_hour * entities > MAX_BARS) {
      conf.points_per_hour = MAX_BARS / (conf.hours_to_show * entities);
      log(`Not enough space, adjusting points_per_hour to ${conf.points_per_hour}`);
    }
  }

  return conf;
};
