// Y-axis boundary computation extracted from MiniGraphCard. Pure functions:
// given a series of Graph objects (each exposing numeric `min`/`max`) and the
// user's bound config, return the [min, max] boundary pair.
import type { BoundarySeries } from './types';

type BoundConfig = string | number | undefined;

export function getBoundary(
  type: 'min' | 'max',
  series: BoundarySeries[],
  configVal: BoundConfig,
  fallback: number,
): number {
  if (!(type in Math)) {
    throw new Error(`The type "${type}" is not present on the Math object`);
  }

  if (configVal === undefined) {
    // dynamic boundary depending on values
    return Math[type](...series.map((ele) => ele[type])) || fallback;
  }
  if (typeof configVal !== 'string' || configVal[0] !== '~') {
    // fixed boundary
    return configVal as number;
  }
  // soft boundary (respecting out of range values)
  return Math[type](Number(configVal.substring(1)), ...series.map((ele) => ele[type]));
}

export function getBoundaries(
  series: BoundarySeries[],
  min: BoundConfig,
  max: BoundConfig,
  fallback: number[],
  minRange?: number | string,
): number[] {
  let boundary = [
    getBoundary('min', series, min, fallback[0]),
    getBoundary('max', series, max, fallback[1]),
  ];

  if (minRange) {
    const currentRange = Math.abs(boundary[0] - boundary[1]);
    const diff = parseFloat(minRange as string) - currentRange;

    // Doesn't matter if minBoundRange is NaN because this will be false if so
    if (diff > 0) {
      const weights = [
        (min !== undefined && (min as never)[0] !== '~') || max === undefined ? 0 : 1,
        (max !== undefined && (max as never)[0] !== '~') || min === undefined ? 0 : 1,
      ];
      const sum = weights[0] + weights[1];
      if (sum > 0) {
        boundary = [
          boundary[0] - (diff * weights[0]) / sum,
          boundary[1] + (diff * weights[1]) / sum,
        ];
      } else {
        boundary = [
          boundary[0] - diff / 2,
          boundary[1] + diff / 2,
        ];
      }
    }
  }

  return boundary;
}
