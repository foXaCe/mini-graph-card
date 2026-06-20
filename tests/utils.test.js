import { describe, it, expect } from 'vitest';
import {
  getMin, getAvg, getMax, getTime, getMilli,
  compress, decompress, getFirstDefinedItem, compareArray,
} from '../src/utils';

const series = [{ state: '10' }, { state: '30' }, { state: '20' }];

describe('utils — aggregation over [val] arrays', () => {
  it('getMin returns the element with the smallest numeric value', () => {
    expect(getMin(series, 'state')).toEqual({ state: '10' });
  });

  it('getMax returns the element with the largest numeric value', () => {
    expect(getMax(series, 'state')).toEqual({ state: '30' });
  });

  it('getAvg returns the arithmetic mean of the numeric values', () => {
    expect(getAvg(series, 'state')).toBe(20);
  });
});

describe('utils — time helpers', () => {
  it('getMilli converts hours to milliseconds', () => {
    expect(getMilli(1)).toBe(3600000);
    expect(getMilli(0.5)).toBe(1800000);
  });

  it('getTime formats hour/minute for a fixed date', () => {
    const date = new Date('2026-06-20T09:05:00');
    const out = getTime(date, { hourCycle: 'h23' }, 'en-US');
    expect(out).toMatch(/09[:h ]?05|9:05/);
  });
});

describe('utils — compress/decompress round-trip', () => {
  it('decompress(compress(x)) returns the original structure', () => {
    const data = { a: 1, b: [1, 2, 3], c: 'héllo' };
    expect(decompress(compress(data))).toEqual(data);
  });

  it('decompress passes through non-string input unchanged', () => {
    const obj = { already: 'parsed' };
    expect(decompress(obj)).toBe(obj);
  });
});

describe('utils — misc helpers', () => {
  it('getFirstDefinedItem returns the first non-undefined argument', () => {
    expect(getFirstDefinedItem(undefined, undefined, 5, 9)).toBe(5);
    expect(getFirstDefinedItem(undefined, false)).toBe(false);
  });

  it('compareArray is true only for same-length, element-equal arrays', () => {
    expect(compareArray([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(compareArray([1, 2], [1, 2, 3])).toBe(false);
    expect(compareArray([1, 2, 3], [1, 9, 3])).toBe(false);
  });
});
