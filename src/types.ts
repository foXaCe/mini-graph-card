// Shared type definitions for mini-graph-card.
//
// Home Assistant is intentionally loose at the edges (hass.states is a bag of
// untyped attributes), so a few `any`s survive on purpose where fighting them
// would add noise without catching real bugs.
import type { HomeAssistant } from 'custom-card-helpers';

export type { HomeAssistant };

/** A Home Assistant entity state as the card consumes it. */
export interface EntityState {
  entity_id: string;
  state: string;
  last_changed?: string;
  last_updated?: string;
  attributes: {
    friendly_name?: string;
    unit_of_measurement?: string;
    icon?: string;
    state_class?: string;
    [key: string]: unknown;
  };
}

/** A single history sample, as returned by the HA history API / cache. */
export interface HistoryItem {
  state: string | number;
  last_changed: string;
  last_updated?: string;
  attributes?: Record<string, unknown>;
}

/** A fully-resolved colour stop after threshold interpolation. */
export interface ColorThreshold {
  color: string;
  value: number;
}

/** A colour stop as authored by the user (value may be omitted/interpolated). */
export interface RawColorStop {
  color: string;
  value?: number | null;
}

/** A gradient stop produced for the SVG `<linearGradient>`. */
export interface GradientStop {
  color: string;
  offset: number;
}

/** A computed bar rectangle. */
export interface BarData {
  x: number;
  y: number;
  height: number;
  width: number;
  value: number;
}

export interface StateMapEntry {
  value: string;
  label: string;
}

export type YAxis = 'primary' | 'secondary';

/** Tap/hold action descriptor (kept looser than custom-card-helpers' union). */
export interface ActionConfig {
  action: 'more-info' | 'navigate' | 'call-service' | 'url' | 'fire-dom-event' | 'toggle' | 'none';
  entity?: string;
  navigation_path?: string;
  service?: string;
  service_data?: Record<string, unknown>;
  url?: string;
  [key: string]: unknown;
}

export interface EntityConfig {
  entity: string;
  name?: string;
  color?: string;
  unit?: string;
  attribute?: string;
  aggregate_func?: string;
  smoothing?: boolean;
  fixed_value?: boolean;
  y_axis?: YAxis;
  show_state?: boolean;
  show_graph?: boolean | string;
  show_line?: boolean;
  show_fill?: boolean;
  show_points?: boolean;
  show_legend?: boolean;
  show_legend_state?: boolean;
  show_indicator?: boolean;
  state_adaptive_color?: boolean;
  /** Assigned at runtime in the `hass` setter so filtered views keep their slot. */
  index?: number;
}

export interface ShowConfig {
  name: boolean;
  icon: boolean;
  state: boolean | 'last';
  graph: 'line' | 'bar' | false;
  labels: boolean | 'hover';
  labels_secondary: boolean | 'hover';
  extrema: boolean;
  average: boolean;
  legend: boolean;
  fill: boolean;
  points: boolean | 'hover';
  loading_indicator?: boolean;
  icon_adaptive_color?: boolean;
  name_adaptive_color?: boolean;
}

/** The user-authored card config (before {@link buildConfig} normalisation). */
export interface RawCardConfig {
  type?: string;
  entities: Array<string | EntityConfig>;
  [key: string]: unknown;
}

/** The internal, fully-normalised config the card renders from. */
export interface MiniGraphCardConfig {
  type: string;
  entities: EntityConfig[];
  name?: string;
  icon?: string;
  icon_image?: string;
  unit?: string;

  // Appearance / layout
  animate: boolean;
  hour24: boolean;
  font_size: number;
  font_size_header: number;
  height: number;
  align_header?: 'left' | 'right' | 'center' | 'default';
  align_icon?: 'left' | 'right' | 'state';
  align_state?: 'left' | 'right' | 'center';
  card_size?: number;
  group?: boolean;
  appearance?: 'minimal' | 'premium';

  // Data
  hours_to_show: number;
  points_per_hour: number;
  aggregate_func: string;
  group_by: 'interval' | 'date' | 'hour' | 'month';
  update_interval?: number;
  cache: boolean;
  compress: boolean;
  smoothing: boolean;
  logarithmic: boolean;

  // Value formatting
  decimals?: number;
  value_factor: number;
  state_map: StateMapEntry[];

  // Colours
  line_color: string[];
  color_thresholds: ColorThreshold[];
  color_thresholds_transition: 'smooth' | 'hard';
  line_width: number;
  bar_spacing: number;

  // Bounds
  lower_bound?: string | number;
  upper_bound?: string | number;
  lower_bound_secondary?: string | number;
  upper_bound_secondary?: string | number;
  min_bound_range?: number;
  min_bound_range_secondary?: number;

  // Interaction
  tap_action: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;

  // Derived at build time
  format: Intl.DateTimeFormatOptions;
  show: ShowConfig;
}

/** Minimal shape the boundary maths needs from a Graph instance. */
export interface BoundarySeries {
  min: number;
  max: number;
}

/** Active tooltip state (set on hover over a point/bar/legend). */
export interface Tooltip {
  value?: number | string;
  count?: number;
  entity?: number;
  time?: [string, string];
  index?: number;
  label?: string | null;
}

/**
 * The subset of the card instance that the SVG render fragments read. Keeping
 * it structural avoids a hard dependency on the (much larger) card class type.
 */
export interface CardContext {
  id: string;
  config: MiniGraphCardConfig;
  entity: EntityState[];
  length: Array<number | string>;
  line: string[];
  fill: string[];
  bar: BarData[][];
  points: number[][][];
  gradient: Array<GradientStop[] | undefined>;
  tooltip: Tooltip;
  computeColor(state: number | string, i: number): string;
  setTooltip(entity: number, index: number, value: number | string, label?: string | null): void;
}

/** The card-picker registration entry (HA 2026.6 `getEntitySuggestion`). */
export interface CustomCardEntry {
  type: string;
  name?: string;
  description?: string;
  preview?: boolean;
  documentationURL?: string;
  getEntitySuggestion?: (
    hass: HomeAssistant,
    entityId: string,
  ) => { config: Record<string, unknown> } | null;
}

declare global {
  interface Window {
    customCards?: CustomCardEntry[];
  }
}
