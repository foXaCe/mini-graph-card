import { describe, it, expect } from 'vitest';
import Graph from '../src/graph';

// margin = [X, Y]; width/height are arbitrary for aggregate-only tests.
const makeGraph = () => new Graph(500, 100, [0, 5]);
const items = vals => vals.map(v => ({ state: String(v) }));

describe('Graph — aggregate functions', () => {
  const g = makeGraph();

  it('_average computes the arithmetic mean', () => {
    expect(g._average(items([10, 20, 30]))).toBe(20);
  });

  it('_maximum / _minimum return the numeric extremes', () => {
    expect(g._maximum(items([10, 30, 20]))).toBe(30);
    expect(g._minimum(items([10, 30, 20]))).toBe(10);
  });

  it('_first / _last return the boundary values', () => {
    expect(g._first(items([7, 8, 9]))).toBe(7);
    expect(g._last(items([7, 8, 9]))).toBe(9);
  });

  it('_sum adds all values', () => {
    expect(g._sum(items([1, 2, 3, 4]))).toBe(10);
  });

  it('_delta is max minus min', () => {
    expect(g._delta(items([10, 30, 20]))).toBe(20);
  });

  it('_diff is last minus first', () => {
    expect(g._diff(items([10, 30, 25]))).toBe(15);
  });
});

describe('Graph — _median (regression: must sort by numeric state)', () => {
  const g = makeGraph();

  it('returns the true median of an unsorted odd-length series', () => {
    // sorted -> [10, 20, 30], median = 20
    expect(g._median(items([10, 30, 20]))).toBe(20);
  });

  it('returns the average of the two middles for an unsorted even-length series', () => {
    // sorted -> [10, 20, 30, 40], median = (20 + 30) / 2 = 25
    expect(g._median(items([40, 10, 30, 20]))).toBe(25);
  });
});

describe('Graph — _lastValue', () => {
  it('returns 0 for delta/diff aggregations', () => {
    const g = new Graph(500, 100, [0, 5], 24, 1, 'delta');
    expect(g._lastValue(items([5, 9]))).toBe(0);
  });

  it('returns the last numeric value otherwise', () => {
    const g = new Graph(500, 100, [0, 5], 24, 1, 'avg');
    expect(g._lastValue(items([5, 9]))).toBe(9);
  });

  it('returns 0 for missing items instead of throwing (sparse history guard)', () => {
    const g = new Graph(500, 100, [0, 5], 24, 1, 'avg');
    expect(g._lastValue(undefined)).toBe(0);
  });
});

describe('Graph — rendering geometry (deterministic via preset coords)', () => {
  const withCoords = () => {
    const g = new Graph(500, 100, [0, 5]);
    g.coords = [[0, 0, 10], [250, 0, 15], [500, 0, 20]];
    g.max = 20;
    g.min = 10;
    return g;
  };

  it('getPath returns an SVG path string starting with a move command', () => {
    const path = withCoords().getPath();
    expect(typeof path).toBe('string');
    expect(path.startsWith('M')).toBe(true);
  });

  it('getFill closes the area path back to the baseline', () => {
    const g = withCoords();
    const fill = g.getFill(g.getPath());
    expect(fill).toContain(' L ');
    expect(fill.trim().endsWith('z')).toBe(true);
  });

  it('getPoints returns one entry per coord', () => {
    const points = withCoords().getPoints();
    expect(Array.isArray(points)).toBe(true);
    expect(points.length).toBeGreaterThan(0);
    expect(points[0]).toHaveLength(4);
  });

  it('getBars returns a rect descriptor per coord', () => {
    const bars = withCoords().getBars(0, 1, 4);
    expect(bars).toHaveLength(3);
    expect(bars[0]).toHaveProperty('x');
    expect(bars[0]).toHaveProperty('height');
    expect(bars[0]).toHaveProperty('value');
  });

  it('computeGradient maps each threshold to a color + offset', () => {
    const grad = withCoords().computeGradient(
      [{ value: 20, color: '#ff0000' }, { value: 10, color: '#0000ff' }],
      false,
    );
    expect(grad).toHaveLength(2);
    expect(grad[0]).toHaveProperty('color');
    expect(grad[0]).toHaveProperty('offset');
  });
});

describe('Graph — update() smoke test', () => {
  it('produces numeric coords/min/max from a recent history', () => {
    const g = new Graph(500, 100, [0, 5], 1, 1, 'avg', 'interval', false);
    g.history = [
      { state: '5', last_changed: new Date().toISOString() },
      { state: '7', last_changed: new Date(new Date().getTime() - 1800000).toISOString() },
    ];
    g.update();
    expect(Array.isArray(g.coords)).toBe(true);
    expect(Number.isFinite(g.min)).toBe(true);
    expect(Number.isFinite(g.max)).toBe(true);
  });
});
