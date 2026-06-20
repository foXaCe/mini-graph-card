 
import { compress as lzStringCompress, decompress as lzStringDecompress } from '@kalkih/lz-string';

type Keyed = Record<string, unknown>;

export const getMin = <T extends Keyed>(arr: T[], val: string): T => arr.reduce((min, p) => (
  Number(p[val]) < Number(min[val]) ? p : min
), arr[0]);

export const getAvg = <T extends Keyed>(arr: T[], val: string): number => arr.reduce((sum, p) => (
  sum + Number(p[val])
), 0) / arr.length;

export const getMax = <T extends Keyed>(arr: T[], val: string): T => arr.reduce((max, p) => (
  Number(p[val]) > Number(max[val]) ? p : max
), arr[0]);

export const getTime = (
  date: Date,
  extra?: Intl.DateTimeFormatOptions,
  locale = 'en-US',
): string => date.toLocaleString(locale, { hour: 'numeric', minute: 'numeric', ...extra });

export const getMilli = (hours: number): number => hours * 60 ** 2 * 10 ** 3;

export const compress = (data: unknown): string => lzStringCompress(JSON.stringify(data));

export const decompress = (data: unknown): unknown => (
  typeof data === 'string' ? JSON.parse(lzStringDecompress(data)) : data
);

export const getFirstDefinedItem = <T>(...collection: T[]): T | undefined => collection.find(
  (item) => typeof item !== 'undefined',
);

export const compareArray = (a: unknown[], b: unknown[]): boolean => a.length === b.length
  && a.every((value, index) => value === b[index]);

export const log = (message: unknown): void => {
   
  console.warn('mini-graph-card: ', message);
};
