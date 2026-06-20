import { describe, it, expect } from 'vitest';
import { getBoundary, getBoundaries } from '../src/boundaries';

const series = [{ min: 5, max: 20 }, { min: 3, max: 18 }];

describe('getBoundary', () => {
  it('computes a dynamic boundary from the series when no config value', () => {
    expect(getBoundary('min', series, undefined, 0)).toBe(3);
    expect(getBoundary('max', series, undefined, 0)).toBe(20);
  });

  it('returns the fixed value verbatim for a plain config value', () => {
    expect(getBoundary('min', series, 1, 0)).toBe(1);
  });

  it('applies a soft (~) boundary, respecting out-of-range data', () => {
    // ~10 as a min must not clip below the data's actual min (3)
    expect(getBoundary('min', series, '~10', 0)).toBe(3);
    // ~10 as a max must extend up to the data's actual max (20)
    expect(getBoundary('max', series, '~10', 0)).toBe(20);
  });

  it('throws for a type not present on Math', () => {
    expect(() => getBoundary('nope', series, undefined, 0)).toThrow(/Math/);
  });
});

describe('getBoundaries', () => {
  it('returns [min, max] over the series', () => {
    expect(getBoundaries(series, undefined, undefined, [0, 1])).toEqual([3, 20]);
  });

  it('expands a too-small range symmetrically to meet min_bound_range', () => {
    // dynamic range is 20-3 = 17; ask for at least 27 -> grow by 10, 5 each side
    const [min, max] = getBoundaries(series, undefined, undefined, [0, 1], 27);
    expect(min).toBeCloseTo(-2);
    expect(max).toBeCloseTo(25);
  });
});
