import type { ShowConfig } from './types';

export const URL_DOCS = 'https://github.com/foXaCe/mini-graph-card/blob/main/README.md';
export const FONT_SIZE = 14;
export const FONT_SIZE_HEADER = 14;
export const MAX_BARS = 96;

export const ICONS: Record<string, string> = {
  humidity: 'hass:water-percent',
  illuminance: 'hass:brightness-5',
  temperature: 'hass:thermometer',
  battery: 'hass:battery',
  pressure: 'hass:gauge',
  power: 'hass:flash',
  signal_strength: 'hass:wifi',
  motion: 'hass:walk',
  door: 'hass:door-closed',
  window: 'hass:window-closed',
  presence: 'hass:account',
  light: 'hass:lightbulb',
};

export const DEFAULT_COLORS: string[] = [
  'var(--accent-color)',
  '#3498db',
  '#e74c3c',
  '#9b59b6',
  '#f1c40f',
  '#2ecc71',
  '#1abc9c',
  '#34495e',
  '#e67e22',
  '#7f8c8d',
  '#27ae60',
  '#2980b9',
  '#8e44ad',
];

export const UPDATE_PROPS: string[] = ['entity', 'line', 'length', 'fill', 'points', 'tooltip', 'abs', 'config'];

export const DEFAULT_SHOW: Partial<ShowConfig> = {
  name: true,
  icon: true,
  state: true,
  graph: 'line',
  labels: 'hover',
  labels_secondary: 'hover',
  extrema: false,
  legend: true,
  fill: true,
  points: 'hover',
};

// Coordinate tuple indices: [X, Y, V] = [x, y, value].
export const X = 0;
export const Y = 1;
export const V = 2;

export const ONE_HOUR = 1000 * 3600;
