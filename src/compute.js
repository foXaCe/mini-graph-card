import { stateIcon } from 'custom-card-helpers';
import { interpolateRgb } from 'd3-interpolate';
import { ICONS } from './const';
import { log } from './utils';

// Pure value/presentation helpers extracted from MiniGraphCard. Each takes the
// data it needs explicitly (config, entity state, language) so it can be unit
// tested in isolation; the card keeps thin delegating methods.

export function color(config, inState, i) {
  const { color_thresholds, line_color } = config;
  const numericState = Number(inState) || 0;

  let intColor;
  if (color_thresholds.length > 0) {
    const { color: found } = color_thresholds.find((ele) => ele.value < numericState)
      || color_thresholds.slice(-1)[0];
    intColor = found;
    const index = color_thresholds.findIndex((ele) => ele.value < numericState);
    const c1 = color_thresholds[index];
    const c2 = color_thresholds[index - 1];
    if (c2) {
      const factor = (c2.value - numericState) / (c2.value - c1.value);
      intColor = interpolateRgb(c2.color, c1.color)(factor);
    } else {
      intColor = index
        ? color_thresholds[color_thresholds.length - 1].color
        : color_thresholds[0].color;
    }
  }

  return config.entities[i].color || intColor || line_color[i] || line_color[0];
}

export function name(config, entityState, index) {
  return config.entities[index].name
    || entityState.attributes.friendly_name
    || entityState.entity_id;
}

export function icon(config, entityState) {
  return (
    config.icon
    || entityState.attributes.icon
    || stateIcon(entityState)
    || ICONS.temperature
  );
}

export function uom(config, entityState, index) {
  return (
    config.entities[index].unit !== undefined
      ? config.entities[index].unit
      : (
        config.unit !== undefined
          ? config.unit
          : (
            !config.entities[index].attribute
              ? (entityState.attributes.unit_of_measurement || '')
              : ''
          )
      )
  );
}

export function numberFormat(num, language, dec) {
  if (!Number.isNaN(Number(num)) && Intl)
    return new Intl.NumberFormat(language, { minimumFractionDigits: dec }).format(Number(num));
  return num.toString();
}

export function state(config, inState, language) {
  if (config.state_map.length > 0) {
    const stateMap = Number.isInteger(inState)
      ? config.state_map[inState]
      : config.state_map.find((s) => s.value === inState);

    if (stateMap) {
      return stateMap.label;
    } else if (typeof inState === 'string' && Number.isNaN(parseFloat(inState))) {
      // Only log for non-numeric values that are expected to be mapped.
      // Numeric values (like graph bounds) shouldn't trigger state_map warnings.
      log(`value [${inState}] not found in state_map`);
    }
  }

  let value;
  if (typeof inState === 'string') {
    value = parseFloat(inState.replace(/,/g, '.'));
  } else {
    value = Number(inState);
  }
  const dec = config.decimals;
  const valueFactor = 10 ** config.value_factor;

  if (dec === undefined || Number.isNaN(dec) || Number.isNaN(value)) {
    return numberFormat(Math.round(value * valueFactor * 100) / 100, language);
  }

  const x = 10 ** dec;
  return numberFormat(
    (Math.round(value * valueFactor * x) / x).toFixed(dec),
    language,
    dec,
  );
}
