import { interpolateRgb } from 'd3-interpolate';
import { X, Y, V, ONE_HOUR } from './const';
import type {
  BarData, ColorThreshold, GradientStop, HistoryItem,
} from './types';

type Coord = number[];
type AggregateFn = (items: HistoryItem[]) => number;

export default class Graph {
  private _history?: HistoryItem[];

  public coords: Coord[];

  public width: number;

  public height: number;

  public margin: number[];

  private _max: number;

  private _min: number;

  public points: number;

  public hours: number;

  public aggregateFuncName: string;

  private _calcPoint: AggregateFn;

  private _smoothing: boolean;

  private _logarithmic: boolean;

  private _groupBy: string;

  private _endTime: number | Date;

  constructor(
    width: number,
    height: number,
    margin: number[],
    hours = 24,
    points = 1,
    aggregateFuncName = 'avg',
    groupBy = 'interval',
    smoothing = true,
    logarithmic = false,
  ) {
    const aggregateFuncMap: Record<string, AggregateFn> = {
      avg: this._average,
      median: this._median,
      max: this._maximum,
      min: this._minimum,
      first: this._first,
      last: this._last,
      sum: this._sum,
      delta: this._delta,
      diff: this._diff,
    };

    this._history = undefined;
    this.coords = [];
    this.width = width - margin[X] * 2;
    this.height = height;
    this.margin = margin;
    this._max = 0;
    this._min = 0;
    this.points = points;
    this.hours = hours;
    this.aggregateFuncName = aggregateFuncName;
    this._calcPoint = aggregateFuncMap[aggregateFuncName] || this._average;
    this._smoothing = smoothing;
    this._logarithmic = logarithmic;
    this._groupBy = groupBy;
    this._endTime = 0;
  }

  get max(): number { return this._max; }

  set max(max: number) { this._max = max; }

  get min(): number { return this._min; }

  set min(min: number) { this._min = min; }

  set history(data: HistoryItem[]) { this._history = data; }

  update(history?: HistoryItem[]): void {
    if (history) {
      this._history = history;
    }
    if (!this._history) return;
    this._updateEndTime();

    const histGroups = this._history.reduce<HistoryItem[][]>(
      (res, item) => this._reducer(res, item),
      [],
    );

    // extend length to fill missing history
    const requiredNumOfPoints = Math.ceil(this.hours * this.points);
    histGroups.length = requiredNumOfPoints;

    this.coords = this._calcPoints(histGroups);
    this.min = Math.min(...this.coords.map((item) => Number(item[V])));
    this.max = Math.max(...this.coords.map((item) => Number(item[V])));
  }

  _reducer(res: HistoryItem[][], item: HistoryItem): HistoryItem[][] {
    const age = (this._endTime as Date).getTime() - new Date(item.last_changed).getTime();
    const interval = ((age / ONE_HOUR) * this.points) - this.hours * this.points;
    if (interval < 0) {
      const key = Math.floor(Math.abs(interval));
      if (!res[key]) res[key] = [];
      res[key].push(item);
    } else {
      res[0] = [item];
    }
    return res;
  }

  _calcPoints(history: HistoryItem[][]): Coord[] {
    let xRatio = this.width / (this.hours * this.points - 1);
    xRatio = Number.isFinite(xRatio) ? xRatio : this.width;

    const coords: Coord[] = [];
    let last = history.filter(Boolean)[0];
    let x;
    for (let i = 0; i < history.length; i += 1) {
      x = xRatio * i + this.margin[X];
      if (history[i]) {
        last = history[i];
        coords.push([x, 0, this._calcPoint(last)]);
      } else {
        coords.push([x, 0, this._lastValue(last)]);
      }
    }
    return coords;
  }

  _calcY(coords: Coord[]): Coord[] {
    // account for logarithmic graph
    const max = this._logarithmic ? Math.log10(Math.max(1, this.max)) : this.max;
    const min = this._logarithmic ? Math.log10(Math.max(1, this.min)) : this.min;

    const yRatio = ((max - min) / this.height) || 1;
    const coords2 = coords.map((coord) => {
      const val = this._logarithmic ? Math.log10(Math.max(1, coord[V])) : coord[V];
      const coordY = this.height - ((val - min) / yRatio);
      return [coord[X], coordY, coord[V]];
    });

    return coords2;
  }

  getPoints(): Coord[] {
    let { coords } = this;
    if (coords.length === 1) {
      coords[1] = [this.width + this.margin[X], 0, coords[0][V]];
    }
    coords = this._calcY(this.coords);
    if (this._smoothing) {
      let last = coords[0];
      coords.shift();
      return coords.map((point, i) => {
        const Z = this._midPoint(last[X], last[Y], point[X], point[Y]);
        const sum = (last[V] + point[V]) / 2;
        last = point;
        return [Z[X], Z[Y], sum, i + 1];
      });
    } else {
      return coords.map((point, i) => [point[X], point[Y], point[V], i]);
    }
  }

  getPath(): string {
    let { coords } = this;
    if (coords.length === 1) {
      coords[1] = [this.width + this.margin[X], 0, coords[0][V]];
    }
    coords = this._calcY(this.coords);
    let next; let Z;
    let path = '';
    let last = coords[0];
    path += `M${last[X]},${last[Y]}`;

    coords.forEach((point) => {
      next = point;
      Z = this._smoothing ? this._midPoint(last[X], last[Y], next[X], next[Y]) : next;
      path += ` ${Z[X]},${Z[Y]}`;
      path += ` Q ${next[X]},${next[Y]}`;
      last = next;
    });
    path += ` ${next![X]},${next![Y]}`;
    return path;
  }

  computeGradient(thresholds: ColorThreshold[], logarithmic: boolean): GradientStop[] {
    const scale = logarithmic
      ? Math.log10(Math.max(1, this._max)) - Math.log10(Math.max(1, this._min))
      : this._max - this._min;

    return thresholds.map((stop, index, arr) => {
      let color;
      if (stop.value > this._max && arr[index + 1]) {
        const factor = (this._max - arr[index + 1].value) / (stop.value - arr[index + 1].value);
        color = interpolateRgb(arr[index + 1].color, stop.color)(factor);
      } else if (stop.value < this._min && arr[index - 1]) {
        const factor = (arr[index - 1].value - this._min) / (arr[index - 1].value - stop.value);
        color = interpolateRgb(arr[index - 1].color, stop.color)(factor);
      }
      let offset;
      if (scale <= 0) {
        offset = 0;
      } else if (logarithmic) {
        offset = (Math.log10(Math.max(1, this._max))
          - Math.log10(Math.max(1, stop.value)))
          * (100 / scale);
      } else {
        offset = (this._max - stop.value) * (100 / scale);
      }
      return {
        color: color || stop.color,
        offset,
      };
    });
  }

  getFill(path: string): string {
    const { height } = this;
    let fill = path;
    const lastX = this.coords[this.coords.length - 1][X];
    fill += ` L ${lastX}, ${height}`;
    fill += ` L ${this.coords[0][X]}, ${height} z`;
    return fill;
  }

  getBars(position: number, total: number, spacing = 4): BarData[] {
    const coords = this._calcY(this.coords);
    const xRatio = ((this.width - spacing) / Math.ceil(this.hours * this.points)) / total;
    return coords.map((coord, i) => ({
      x: (xRatio * i * total) + (xRatio * position) + spacing,
      y: coord[Y],
      height: this.height - coord[Y],
      width: xRatio - spacing,
      value: coord[V],
    }));
  }

  _midPoint(Ax: number, Ay: number, Bx: number, By: number): number[] {
    const Zx = (Ax - Bx) / 2 + Bx;
    const Zy = (Ay - By) / 2 + By;
    return [Zx, Zy];
  }

  _average(items: HistoryItem[]): number {
    return items.reduce((sum, entry) => (sum + parseFloat(entry.state as string)), 0) / items.length;
  }

  _median(items: HistoryItem[]): number {
    const itemsDup = [...items].sort((a, b) => parseFloat(a.state as string) - parseFloat(b.state as string));
    const mid = Math.floor((itemsDup.length - 1) / 2);
    if (itemsDup.length % 2 === 1)
      return parseFloat(itemsDup[mid].state as string);
    return (parseFloat(itemsDup[mid].state as string) + parseFloat(itemsDup[mid + 1].state as string)) / 2;
  }

  _maximum(items: HistoryItem[]): number {
    return Math.max(...items.map((item) => Number(item.state)));
  }

  _minimum(items: HistoryItem[]): number {
    return Math.min(...items.map((item) => Number(item.state)));
  }

  _first(items: HistoryItem[]): number {
    return parseFloat(items[0].state as string);
  }

  _last(items: HistoryItem[]): number {
    return parseFloat(items[items.length - 1].state as string);
  }

  _sum(items: HistoryItem[]): number {
    return items.reduce((sum, entry) => sum + parseFloat(entry.state as string), 0);
  }

  _delta(items: HistoryItem[]): number {
    return this._maximum(items) - this._minimum(items);
  }

  _diff(items: HistoryItem[]): number {
    return this._last(items) - this._first(items);
  }

  _lastValue(items: HistoryItem[]): number {
    if (!items || ['delta', 'diff'].includes(this.aggregateFuncName)) {
      return 0;
    } else {
      return parseFloat(items[items.length - 1].state as string) || 0;
    }
  }

  _updateEndTime(): void {
    this._endTime = new Date();
    switch (this._groupBy) {
      case 'month':
        this._endTime.setMonth(this._endTime.getMonth() + 1);
        this._endTime.setDate(1);
        break;
      case 'date':
        this._endTime.setDate(this._endTime.getDate() + 1);
        this._endTime.setHours(0, 0, 0, 0);
        break;
      case 'hour':
        this._endTime.setHours(this._endTime.getHours() + 1);
        this._endTime.setMinutes(0, 0, 0);
        break;
      default:
        break;
    }
  }
}
