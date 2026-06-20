import { describe, it, expect } from 'vitest';
import buildConfig from '../src/buildConfig';
import { DEFAULT_COLORS } from '../src/const';

const base = { entities: ['sensor.a'] };

describe('buildConfig — defaults & normalization', () => {
  it('applies sane defaults', () => {
    const c = buildConfig(base);
    expect(c.hours_to_show).toBe(24);
    expect(c.points_per_hour).toBe(0.5);
    expect(c.aggregate_func).toBe('avg');
    expect(c.group_by).toBe('interval');
    expect(c.line_width).toBe(5);
    expect(c.show.name).toBe(true);
    expect(c.show.graph).toBe('line');
  });

  it('normalizes string entities into objects', () => {
    const c = buildConfig({ entities: ['sensor.a', { entity: 'sensor.b' }] });
    expect(c.entities[0]).toEqual({ entity: 'sensor.a' });
    expect(c.entities[1]).toEqual({ entity: 'sensor.b' });
  });

  it('normalizes a string state_map into {value,label} objects', () => {
    const c = buildConfig({ ...base, state_map: ['home', { value: 'away' }] });
    expect(c.state_map[0]).toEqual({ value: 'home', label: 'home' });
    expect(c.state_map[1]).toEqual({ value: 'away', label: 'away' });
  });

  it('expands a single line_color string into [color, ...DEFAULT_COLORS]', () => {
    const c = buildConfig({ ...base, line_color: '#abcdef' });
    expect(c.line_color[0]).toBe('#abcdef');
    expect(c.line_color.slice(1)).toEqual(DEFAULT_COLORS);
  });

  it('merges user show flags over the defaults', () => {
    const c = buildConfig({ ...base, show: { name: false, fill: false } });
    expect(c.show.name).toBe(false);
    expect(c.show.fill).toBe(false);
    expect(c.show.icon).toBe(true); // untouched default
  });
});

describe('buildConfig — group_by overrides points_per_hour', () => {
  it('group_by=hour forces points_per_hour=1', () => {
    expect(buildConfig({ ...base, group_by: 'hour' }).points_per_hour).toBe(1);
  });

  it('group_by=date forces points_per_hour=1/24', () => {
    expect(buildConfig({ ...base, group_by: 'date' }).points_per_hour).toBe(1 / 24);
  });
});

describe('buildConfig — color thresholds', () => {
  it('keeps an empty thresholds list empty', () => {
    expect(buildConfig(base).color_thresholds).toEqual([]);
  });

  it('interpolates missing values between valued stops (smooth)', () => {
    const c = buildConfig({
      ...base,
      color_thresholds_transition: 'smooth',
      color_thresholds: [
        { value: 0, color: '#000' },
        { color: '#111' },
        { value: 4, color: '#222' },
      ],
    });
    // sorted descending by value after interpolation: 4, 2, 0
    const values = c.color_thresholds.map(s => s.value);
    expect(values).toEqual([4, 2, 0]);
  });
});

describe('buildConfig — validation', () => {
  it('throws when entities is not an array', () => {
    expect(() => buildConfig({ entities: 'sensor.a' })).toThrow(/entities/);
  });

  it('throws on the removed line_color_above/below options', () => {
    expect(() => buildConfig({ ...base, line_color_above: 'red' })).toThrow(/color_thresholds/);
  });
});
