// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import {
  color, name, icon, uom, state,
} from '../src/compute';

describe('compute.color', () => {
  const baseConfig = { color_thresholds: [], line_color: ['#aaa', '#bbb'], entities: [{}, {}] };

  it('falls back to line_color by index when no override / thresholds', () => {
    expect(color(baseConfig, 5, 0)).toBe('#aaa');
    expect(color(baseConfig, 5, 1)).toBe('#bbb');
  });

  it('prefers an explicit per-entity color', () => {
    const config = { ...baseConfig, entities: [{ color: '#fff' }, {}] };
    expect(color(config, 5, 0)).toBe('#fff');
  });

  it('interpolates between thresholds and returns a color string', () => {
    const config = {
      color_thresholds: [{ value: 30, color: '#ff0000' }, { value: 10, color: '#0000ff' }],
      line_color: ['#aaa'],
      entities: [{}],
    };
    const out = color(config, 20, 0);
    expect(typeof out).toBe('string');
    expect(out.length).toBeGreaterThan(0);
  });
});

describe('compute.name', () => {
  const entityState = { attributes: { friendly_name: 'Living Room' }, entity_id: 'sensor.lr' };

  it('prefers the configured name', () => {
    expect(name({ entities: [{ name: 'Custom' }] }, entityState, 0)).toBe('Custom');
  });

  it('falls back to friendly_name then entity_id', () => {
    expect(name({ entities: [{}] }, entityState, 0)).toBe('Living Room');
    expect(name({ entities: [{}] }, { attributes: {}, entity_id: 'sensor.lr' }, 0)).toBe('sensor.lr');
  });
});

describe('compute.icon', () => {
  it('prefers config.icon then entity attribute icon', () => {
    expect(icon({ icon: 'mdi:star' }, { attributes: {} })).toBe('mdi:star');
    expect(icon({}, { attributes: { icon: 'mdi:flash' } })).toBe('mdi:flash');
  });
});

describe('compute.uom', () => {
  const entityState = { attributes: { unit_of_measurement: '°C' } };

  it('prefers per-entity unit, then global unit, then entity attribute', () => {
    expect(uom({ entities: [{ unit: 'kWh' }] }, entityState, 0)).toBe('kWh');
    expect(uom({ unit: 'W', entities: [{}] }, entityState, 0)).toBe('W');
    expect(uom({ entities: [{}] }, entityState, 0)).toBe('°C');
  });

  it('returns empty string when reading an attribute (no implicit unit)', () => {
    expect(uom({ entities: [{ attribute: 'battery' }] }, entityState, 0)).toBe('');
  });
});

describe('compute.state', () => {
  const cfg = (over = {}) => ({
    state_map: [], decimals: undefined, value_factor: 0, ...over,
  });

  it('maps a value through state_map by value', () => {
    const config = cfg({ state_map: [{ value: 'home', label: 'At home' }] });
    expect(state(config, 'home', 'en')).toBe('At home');
  });

  it('formats a numeric value, honouring decimals', () => {
    expect(state(cfg({ decimals: 2 }), 3.14159, 'en')).toBe('3.14');
  });

  it('applies value_factor (powers of ten)', () => {
    expect(state(cfg({ value_factor: 3, decimals: 0 }), 2, 'en')).toBe('2,000');
  });
});
