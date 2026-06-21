import {
  LitElement, html, svg, nothing, type TemplateResult, type PropertyValues,
} from 'lit';
import localForage from 'localforage';
import SparkMD5 from 'spark-md5';
import Graph from './graph';
import style from './style';
import handleClick from './handleClick';
import buildConfig from './buildConfig';
import { localize } from './localize';
import * as compute from './compute';
import { getBoundaries } from './boundaries';
import { fetchRecent, getCache, setCache } from './dataSource';
import renderSvg from './renderSvg';
import './initialize';
import { version } from '../package.json';
import './editor/editor';

import { UPDATE_PROPS, V, ONE_HOUR } from './const';
import {
  getMin, getAvg, getMax,
  getTime, getMilli,
  getFirstDefinedItem,
  compareArray,
  log,
} from './utils';
import type {
  ActionConfig, BarData, EntityState, GradientStop, HistoryItem, HomeAssistant, MiniGraphCardConfig, RawCardConfig, Tooltip,
} from './types';

interface AbsEntry {
  type: 'min' | 'avg' | 'max';
  state: number | string;
  last_changed?: string;
}

// Shape of a cached history entry as written by setCache / read by getCache.
interface CachedHistory {
  hours_to_show: number;
  last_fetched: string;
  data: HistoryItem[];
}

// Local equivalent of custom-card-helpers' hasAction, accepting this project's
// looser ActionConfig (an action is "active" when set and not 'none').
const hasAction = (cfg?: ActionConfig): boolean => !!cfg && cfg.action !== 'none';

class MiniGraphCard extends LitElement {
  public id: string;

  private _hass!: HomeAssistant;

  public config!: MiniGraphCardConfig;

  public bound: number[];

  public boundSecondary: number[];

  public length: Array<number | string>;

  public entity: EntityState[];

  public Graph!: Graph[];

  public line: string[];

  public bar: BarData[][];

  public abs: AbsEntry[];

  public fill: string[];

  public points: number[][][];

  public gradient: Array<GradientStop[] | undefined>;

  public tooltip: Tooltip;

  public updateQueue: string[];

  public updating: boolean;

  public stateChanged: boolean;

  public initial: boolean;

  public color?: string;

  private _md5Config?: string;

  // Tap/hold/double-tap gesture state (additive to the existing tap path).
  private _held = false;

  private _holdTimer?: ReturnType<typeof setTimeout>;

  private _tapTimer?: ReturnType<typeof setTimeout>;

  private interval?: ReturnType<typeof setInterval>;

  constructor() {
    super();
    this.id = Math.random()
      .toString(36)
      .substring(2, 11);
    this.config = {} as MiniGraphCardConfig;
    this.bound = [0, 0];
    this.boundSecondary = [0, 0];
    this.length = [];
    this.entity = [];
    this.line = [];
    this.bar = [];
    this.abs = [];
    this.fill = [];
    this.points = [];
    this.gradient = [];
    this.tooltip = {};
    this.updateQueue = [];
    this.updating = false;
    this.stateChanged = false;
    this.initial = true;
    this._md5Config = undefined;
  }

  static get styles() {
    return style;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    let updated = false;
    const queue: string[] = [];
    this.config.entities.forEach((entity, index) => {
      this.config.entities[index].index = index; // Required for filtered views
      const entityState = (hass && hass.states[entity.entity]) as EntityState | undefined;
      if (entityState && this.entity[index] !== entityState) {
        this.entity[index] = entityState;
        queue.push(`${entityState.entity_id}-${index}`);
        updated = true;
      }
    });
    if (updated) {
      this.stateChanged = true;
      this.entity = [...this.entity];
      if (!this.config.update_interval && !this.updating) {
        setTimeout(() => {
          this.updateQueue = [...queue, ...this.updateQueue];
          this.updateData();
        }, this.initial ? 0 : 1000);
      } else {
        this.updateQueue = [...queue, ...this.updateQueue];
      }
    }
  }

  get hass(): HomeAssistant {
    return this._hass;
  }

  static get properties() {
    return {
      // `id` is reactive so Lit's accessor stores it internally; assigning it in
      // the constructor must not touch the native id attribute (forbidden there).
      id: { state: true },
      _hass: { state: true },
      config: { state: true },
      entity: { state: true },
      Graph: { state: true },
      line: { state: true },
      length: { state: true },
      bound: { state: true },
      boundSecondary: { state: true },
      abs: { state: true },
      tooltip: { state: true },
      updateQueue: { state: true },
      color: { state: true },
    };
  }

  setConfig(config: RawCardConfig): void {
    if (!config) throw new Error(localize('card.error.invalid_config', this._hass));
    if (!Array.isArray(config.entities) || config.entities.length === 0) {
      throw new Error(localize('card.error.no_entities', this._hass));
    }

    this.config = buildConfig(config);
    this._md5Config = SparkMD5.hash(JSON.stringify(this.config));
    const entitiesChanged = !compareArray(this.config.entities || [], config.entities);

    if (!this.Graph || entitiesChanged) {
      if (this._hass) this.hass = this._hass;
      this.Graph = this.config.entities.map(
        (entity) => new Graph(
          500,
          this.config.height,
          [this.config.show.fill ? 0 : this.config.line_width, this.config.line_width],
          this.config.hours_to_show,
          this.config.points_per_hour,
          entity.aggregate_func || this.config.aggregate_func,
          this.config.group_by,
          getFirstDefinedItem(
            entity.smoothing,
            this.config.smoothing,
            !entity.entity.startsWith('binary_sensor.'), // turn off for binary sensor by default
          ),
          this.config.logarithmic,
        ),
      );
    }
  }

  connectedCallback(): void {
    super.connectedCallback();

    if (this.config.update_interval) {
      window.requestAnimationFrame(() => {
        this.updateOnInterval();
      });
      this.interval = setInterval(
        () => this.updateOnInterval(),
        this.config.update_interval * 1000,
      );
    }
  }

  disconnectedCallback(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
    super.disconnectedCallback();
  }

  shouldUpdate(changedProps: PropertyValues): boolean {
    if (UPDATE_PROPS.some((prop) => changedProps.has(prop))) {
      // Guard against a configured entity that is entirely absent from hass
      // (entity[0] undefined): compute the colour from the value we have, so
      // render() can reach renderWarnings() instead of throwing here.
      const stateValue = this.tooltip.value !== undefined
        ? this.tooltip.value
        : (this.entity[0] !== undefined ? this.getEntityState(0) : undefined);
      this.color = this.computeColor(stateValue ?? 0, this.tooltip.entity || 0);
      return true;
    }
    return false;
  }

  firstUpdated(): void {
    this.initial = false;
  }

  updated(changedProperties: PropertyValues): void {
    if (this.config.animate && changedProperties.has('line')) {
      if (this.length.length < this.entity.length) {
        this.shadowRoot!.querySelectorAll('svg path.line').forEach((ele) => {
          this.length[Number((ele as SVGPathElement).id)] = (ele as SVGPathElement).getTotalLength();
        });
        this.length = [...this.length];
      } else {
        this.length = Array(this.entity.length).fill('none');
      }
    }
  }

  render(): TemplateResult | typeof nothing {
    const { config } = this;
    if (!config || !this.entity || !this._hass)
      return nothing;
    // Premium layer is opt-out via `appearance: minimal` (see style.ts).
    this.dataset.appearance = config.appearance ?? 'premium';
    if (this.config.entities.some((_, index) => this.entity[index] === undefined)) {
      return this.renderWarnings();
    }
    const interactive = [config.tap_action, config.hold_action, config.double_tap_action]
      .some((a) => !!a && a.action !== 'none');
    const cardTarget = config.tap_action.entity || this.entity[0];
    return html`
      <ha-card
        class="flex"
        ?group=${config.group}
        ?fill=${config.show.graph && config.show.fill}
        ?points=${config.show.points === 'hover'}
        ?labels=${config.show.labels === 'hover'}
        ?labels-secondary=${config.show.labels_secondary === 'hover'}
        ?gradient=${config.color_thresholds.length > 0}
        ?hover=${interactive}
        role=${interactive ? 'button' : nothing}
        tabindex=${interactive ? '0' : nothing}
        aria-label=${config.name || this.computeName(0)}
        style="font-size: ${config.font_size}px;"
        @click=${(e: Event) => this._onCardTap(e, cardTarget)}
        @dblclick=${(e: Event) => this._onCardDblTap(e, cardTarget)}
        @pointerdown=${() => this._onCardPointerDown(cardTarget)}
        @pointerup=${() => this._onCardPointerUp()}
        @pointercancel=${() => this._onCardPointerUp()}
        @keydown=${(e: KeyboardEvent) => this._handleKeydown(e, cardTarget)}
      >
        ${this.renderHeader()} ${this.renderStates()} ${this.renderGraph()} ${this.renderInfo()}
      </ha-card>
    `;
  }

  renderWarnings() {
    return html`
      <hui-warning>
        <div>mini-graph-card</div>
        ${this.config.entities.map((_, index) => (!this.entity[index] ? html`
          <div>
            ${localize('card.error.entity_not_available', this._hass)} ${this.config.entities[index].entity}
          </div>
        ` : html``))}
      </hui-warning>
    `;
  }

  renderHeader() {
    const {
      show, align_icon, align_header, font_size_header,
    } = this.config;
    return show.name || (show.icon && align_icon !== 'state')
      ? html`
          <div class="header flex" loc=${align_header} style="font-size: ${font_size_header}px;">
            ${this.renderName()} ${align_icon !== 'state' ? this.renderIcon() : ''}
          </div>
        `
      : '';
  }

  renderIcon() {
    if (this.config.icon_image !== undefined) {
      return html`
        <div class="icon">
          <img src="${this.config.icon_image}" height="25"/>
        </div>
      `;
    }

    const { icon, icon_adaptive_color } = this.config.show;
    return icon ? html`
      <div class="icon" loc=${this.config.align_icon}
        style=${icon_adaptive_color ? `color: ${this.color};` : ''}>
        <ha-icon .icon=${this.computeIcon(this.entity[0])}></ha-icon>
      </div>
    ` : '';
  }

  renderName() {
    if (!this.config.show.name) return;
    const name = this.tooltip.entity !== undefined
      ? this.computeName(this.tooltip.entity)
      : this.config.name || this.computeName(0);
    const color = this.config.show.name_adaptive_color ? `opacity: 1; color: ${this.color};` : '';

    return html`
      <div class="name flex">
        <span class="ellipsis" style=${color}>${name}</span>
      </div>
    `;
  }

  renderStates() {
    if (this.config.show.state)
      return html`
        <div class="states flex" loc=${this.config.align_state}>
          ${this.renderState(0)}
          <div class="states--secondary">${this.config.entities.map((_, i) => (i > 0 && this.renderState(i)) || '')}</div>
          ${this.config.align_icon === 'state' ? this.renderIcon() : ''}
        </div>
      `;
    return undefined;
  }

  getObjectAttr(obj: Record<string, any>, path: string): any {
    return path.split('.').reduce((res, key) => res && res[key], obj);
  }

  getEntityState(id: number): number | string {
    const entityConfig = this.config.entities[id];
    if (this.config.show.state === 'last') {
      return this.points[id][this.points[id].length - 1][V];
    } else if (entityConfig.attribute) {
      return this.getObjectAttr(this.entity[id].attributes, entityConfig.attribute);
    } else {
      return this.entity[id].state;
    }
  }

  renderState(id: number) {
    const isPrimary = id === 0; // rendering main state element?
    if (isPrimary || this.config.entities[id].show_state) {
      const state = this.getEntityState(id);
      // use tooltip data for main state element, if tooltip is active
      const { entity: tooltipEntity, value: tooltipValue } = this.tooltip;
      const isTooltip = isPrimary && tooltipEntity !== undefined;
      const value = isTooltip ? tooltipValue! : state;
      const entity = isTooltip ? tooltipEntity! : id;
      const entityConfig = this.config.entities[entity];
      return html`
        <div
          class="state ${!isPrimary ? 'state--small' : ''}"
          @click=${(e: Event) => this.handlePopup(e, this.entity[id])}
          style=${entityConfig.state_adaptive_color ? `color: ${this.computeColor(value, entity)}` : ''}>
          ${entityConfig.show_indicator ? this.renderIndicator(value, entity) : ''}
          <span class="state__value ellipsis">
            ${this.computeState(value)}
          </span>
          <span class="state__uom ellipsis">
            ${this.computeUom(entity)}
          </span>
          ${(isPrimary && this.renderStateTime()) || ''}
        </div>
      `;
    }
    return undefined;
  }

  renderStateTime() {
    if (this.tooltip.value === undefined) return undefined;
    return html`
      <div class="state__time">
        ${this.tooltip.label ? html`
          <span class="tooltip--label">${this.tooltip.label}</span>
        ` : html`
          <span>${this.tooltip.time![0]}</span> -
          <span>${this.tooltip.time![1]}</span>
        `}
      </div>
    `;
  }

  renderGraph() {
    const ready = (this.entity[0] && !this.Graph.some(
      (element, index) => (element as any)._history === undefined
      && this.config.entities[index].show_graph !== false,
    ))
    || this.config.show.loading_indicator === false;
    return this.config.show.graph ? html`
      <div class="graph">
        ${ready ? html`
            <div class="graph__container">
              ${this.renderLabels()}
              ${this.renderLabelsSecondary()}
              <div class="graph__container__svg" aria-hidden="true">
                ${renderSvg(this)}
              </div>
            </div>
            ${this.renderLegend()}
        ` : html`<ha-spinner aria-label="${localize('card.a11y.loading', this._hass)}" size="small"></ha-spinner>`}
      </div>` : '';
  }

  computeLegend(index: number): string {
    let legend = this.computeName(index);
    const state = this.getEntityState(index);

    const { show_legend_state = false } = this.config.entities[index];

    if (show_legend_state) {
      legend += ` (${this.computeState(state)}`;
      if (!(['unavailable'].includes(String(state)))) {
        const uom = this.computeUom(index);
        if (!(['%', ''].includes(uom)))
          legend += ' ';
        legend += `${uom}`;
      }
      legend += ')';
    }

    return legend;
  }

  renderLegend() {
    if (this.visibleLegends.length <= 1 || !this.config.show.legend) return undefined;
    const interactive = this.config.tap_action.action !== 'none';

    return html`
      <div class="graph__legend" role="list">
        ${this.visibleLegends.map((entity) => {
    const legend = this.computeLegend(entity.index!);
    return html`
            <div class="graph__legend__item"
              role=${interactive ? 'button' : 'listitem'}
              tabindex=${interactive ? '0' : nothing}
              aria-label=${legend}
              @click=${(e: Event) => this.handlePopup(e, this.entity[entity.index!])}
              @keydown=${(e: KeyboardEvent) => this._handleKeydown(e, this.entity[entity.index!])}
              @mouseenter=${() => this.setTooltip(entity.index!, -1, this.getEntityState(entity.index!), localize('card.labels.current', this._hass))}
              @mouseleave=${() => { this.tooltip = {}; }}>
              ${this.renderIndicator(this.getEntityState(entity.index!), entity.index!)}
              <span class="ellipsis">${legend}</span>
            </div>
          `;
  })}
      </div>
    `;
  }

  renderIndicator(state: number | string, index: number) {
    return svg`
      <svg width='10' height='10'>
        <rect width='10' height='10' fill=${this.computeColor(state, index)} />
      </svg>
    `;
  }

  setTooltip(entity: number, index: number, value: number | string, label: string | null = null): void {
    const {
      group_by,
      points_per_hour,
      hours_to_show,
      format,
    } = this.config;

    // time units in milliseconds in this function
    const interval = getMilli(1 / points_per_hour);
    const n_points = Math.ceil(hours_to_show * points_per_hour);

    // index is 0 (oldest) to n_points-1 (most recent ~= now)
    // count of intervals from now to end of bin
    // count is 0 (now) to n_points-1 (oldest)
    const count = (n_points - 1) - index;

    // offset end by a minute, if grouped by, e.g., date or hour
    const oneMinute = group_by !== 'interval' ? 60000 : 0;

    const now = this.getEndDate();

    now.setMilliseconds(now.getMilliseconds() - oneMinute - interval * count);
    const end = getTime(now, format, this._hass.language);
    now.setMilliseconds(now.getMilliseconds() + oneMinute - interval);
    const start = getTime(now, format, this._hass.language);

    this.tooltip = {
      value,
      count,
      entity,
      time: [start, end],
      index,
      label,
    };
  }

  renderLabels() {
    if (!this.config.show.labels || this.primaryYaxisSeries.length === 0) return undefined;
    return html`
      <div class="graph__labels --primary flex">
        <span class="label--max">${this.computeState(this.bound[1])}</span>
        <span class="label--min">${this.computeState(this.bound[0])}</span>
      </div>
    `;
  }

  renderLabelsSecondary() {
    if (!this.config.show.labels_secondary || this.secondaryYaxisSeries.length === 0) return undefined;
    return html`
      <div class="graph__labels --secondary flex">
        <span class="label--max">${this.computeState(this.boundSecondary[1])}</span>
        <span class="label--min">${this.computeState(this.boundSecondary[0])}</span>
      </div>
    `;
  }

  renderInfo() {
    return this.abs.length > 0 ? html`
      <div class="info flex">
        ${this.abs.map((entry) => html`
          <div class="info__item">
            <span class="info__item__type">${localize(`card.display_type.${entry.type}`, this._hass)}</span>
            <span class="info__item__value">
              ${this.computeState(entry.state)} ${this.computeUom(0)}
            </span>
            <span class="info__item__time">
              ${entry.type !== 'avg' ? getTime(new Date(entry.last_changed!), this.config.format, this._hass.language) : ''}
            </span>
          </div>
        `)}
      </div>
    ` : html``;
  }

  handlePopup(e: Event, entity: EntityState | string): void {
    e.stopPropagation();
    const entityId = typeof entity === 'string' ? entity : entity.entity_id;
    handleClick(this, this._hass, this.config, this.config.tap_action, entityId);
  }

  // Keyboard activation for the focusable card and legend items (Enter / Space).
  _handleKeydown(e: KeyboardEvent, entity: EntityState | string): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handlePopup(e, entity);
    }
  }

  // ── Tap / hold / double-tap routing for the card ──────────────────────────
  // Hold is detected with a pointer-down timer; double-tap uses the native
  // dblclick. The single tap is debounced only when a double_tap action is set,
  // so the default (tap-only) path stays immediate and unchanged.
  private _actionConfigFor(kind: 'tap' | 'hold' | 'double_tap'): ActionConfig | undefined {
    if (kind === 'hold') return this.config.hold_action;
    if (kind === 'double_tap') return this.config.double_tap_action;
    return this.config.tap_action;
  }

  _dispatchAction(kind: 'tap' | 'hold' | 'double_tap', entity: EntityState | string): void {
    const cfg = this._actionConfigFor(kind);
    if (!cfg || cfg.action === 'none') return;
    const entityId = typeof entity === 'string' ? entity : entity.entity_id;
    handleClick(this, this._hass, this.config, cfg, entityId);
  }

  _onCardPointerDown(entity: EntityState | string): void {
    this._held = false;
    if (hasAction(this.config.hold_action)) {
      this._holdTimer = setTimeout(() => {
        this._held = true;
        this._dispatchAction('hold', entity);
      }, 500);
    }
  }

  _onCardPointerUp(): void {
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = undefined;
    }
  }

  _onCardTap(e: Event, entity: EntityState | string): void {
    e.stopPropagation();
    if (this._held) { this._held = false; return; } // a hold already fired
    if (hasAction(this.config.double_tap_action)) {
      // wait briefly to see whether a dblclick follows before firing tap
      if (this._tapTimer) return;
      this._tapTimer = setTimeout(() => {
        this._tapTimer = undefined;
        this._dispatchAction('tap', entity);
      }, 250);
    } else {
      this._dispatchAction('tap', entity);
    }
  }

  _onCardDblTap(e: Event, entity: EntityState | string): void {
    e.stopPropagation();
    if (this._tapTimer) {
      clearTimeout(this._tapTimer);
      this._tapTimer = undefined;
    }
    this._dispatchAction('double_tap', entity);
  }

  get visibleEntities() {
    return this.config.entities.filter((entity) => entity.show_graph !== false);
  }

  get primaryYaxisEntities() {
    return this.visibleEntities.filter((entity) => entity.y_axis === undefined
      || entity.y_axis === 'primary');
  }

  get secondaryYaxisEntities() {
    return this.visibleEntities.filter((entity) => entity.y_axis === 'secondary');
  }

  get visibleLegends() {
    return this.visibleEntities.filter((entity) => entity.show_legend !== false);
  }

  get primaryYaxisSeries() {
    return this.primaryYaxisEntities.map((entity) => this.Graph[entity.index!]);
  }

  get secondaryYaxisSeries() {
    return this.secondaryYaxisEntities.map((entity) => this.Graph[entity.index!]);
  }

  computeColor(inState: number | string, i: number): string {
    return compute.color(this.config, inState, i);
  }

  computeName(index: number): string {
    return compute.name(this.config, this.entity[index], index);
  }

  computeIcon(entity: EntityState): string {
    return compute.icon(this.config, entity);
  }

  computeUom(index: number): string {
    return compute.uom(this.config, this.entity[index], index);
  }

  computeState(inState: number | string): string {
    return compute.state(this.config, inState, this._hass.language);
  }

  updateOnInterval(): void {
    if (this.stateChanged && !this.updating) {
      this.stateChanged = false;
      this.updateData();
    }
  }

  async updateData(): Promise<void> {
    const { config } = this;
    this.updating = true;

    const end = this.getEndDate();
    const start = new Date(end);
    start.setMilliseconds(start.getMilliseconds() - getMilli(config.hours_to_show));

    try {
      const promise = this.entity.map((entity, i) => this.updateEntity(entity, i, start, end));
      await Promise.all(promise);
    } catch (err) {
      log(err);
    }

    if (config.show.graph) {
      this.entity.forEach((entity, i) => {
        if (entity) this.Graph[i].update();
      });
    }

    this.updateBounds();

    if (config.show.graph) {
      let graphPos = 0;
      this.entity.forEach((entity, i) => {
        if (!entity || this.Graph[i].coords.length === 0) return;
        const bound = config.entities[i].y_axis === 'secondary' ? this.boundSecondary : this.bound;
        [this.Graph[i].min, this.Graph[i].max] = [bound[0], bound[1]];
        if (config.show.graph === 'bar') {
          const numVisible = this.visibleEntities.length;
          this.bar[i] = this.Graph[i].getBars(graphPos, numVisible, config.bar_spacing);
          graphPos += 1;
        } else {
          const line = this.Graph[i].getPath();
          if (config.entities[i].show_line !== false) this.line[i] = line;
          if (config.show.fill
            && config.entities[i].show_fill !== false) this.fill[i] = this.Graph[i].getFill(line);
          if (config.show.points && (config.entities[i].show_points !== false)) {
            this.points[i] = this.Graph[i].getPoints();
          }
          if (config.color_thresholds.length > 0 && !config.entities[i].color)
            this.gradient[i] = this.Graph[i].computeGradient(
              config.color_thresholds,
              this.config.logarithmic,
            );
        }
      });
      this.line = [...this.line];
    }
    this.updating = false;
    this.setNextUpdate();
  }

  updateBounds(): void {
    const { config } = this;
    this.bound = getBoundaries(
      this.primaryYaxisSeries,
      config.lower_bound,
      config.upper_bound,
      this.bound,
      config.min_bound_range,
    );

    this.boundSecondary = getBoundaries(
      this.secondaryYaxisSeries,
      config.lower_bound_secondary,
      config.upper_bound_secondary,
      this.boundSecondary,
      config.min_bound_range_secondary,
    );
  }

  async updateEntity(entity: EntityState, index: number, initStart: Date, end: Date): Promise<void> {
    if (!entity
      || !this.updateQueue.includes(`${entity.entity_id}-${index}`)
      || this.config.entities[index].show_graph === false
    ) return;
    this.updateQueue = this.updateQueue.filter((entry) => entry !== `${entity.entity_id}-${index}`);

    let stateHistory: HistoryItem[] = [];
    let start = initStart;
    let skipInitialState = false;

    let history: CachedHistory | null = null;
    if (this.config.cache) {
      history = await getCache(this._md5Config!, `${entity.entity_id}_${index}`, this.config.compress) as CachedHistory | null;
      if (history && history.hours_to_show === this.config.hours_to_show) {
        stateHistory = history.data;
      }
    }

    if (stateHistory.length > 0) {
      let currDataIndex = stateHistory.findIndex((item) => new Date(item.last_changed) > initStart);
      if (currDataIndex !== -1) {
        if (currDataIndex > 0) {
          // include previous item
          currDataIndex -= 1;
          // but change it's last changed time
          stateHistory[currDataIndex].last_changed = initStart as unknown as string;
        }

        stateHistory = stateHistory.slice(currDataIndex, stateHistory.length);
        // skip initial state when fetching recent/not-cached data
        skipInitialState = true;
      } else {
        // there were no states which could be used in current graph so clearing
        stateHistory = [];
      }

      // Non-null: this branch is only reached when the cache populated
      // stateHistory above (which requires history to be set).
      const lastFetched = new Date(history!.last_fetched);
      if (lastFetched > start) {
        start = new Date(lastFetched.getTime() - 1);
      }
    }

    const fetched: HistoryItem[][] = await fetchRecent(
      this._hass,
      entity.entity_id,
      start,
      end,
      this.config.entities[index].attribute ? false : skipInitialState,
      !!this.config.entities[index].attribute,
    );
    if (fetched[0] && fetched[0].length > 0) {
      const rows = fetched[0];
      /**
      * hack because HA doesn't return anything if skipInitialState is false
      * when retrieving for attributes so we retrieve it and we remove it.*
      */
      if (this.config.entities[index].attribute && skipInitialState) {
        rows.shift();
      }
      // check if we should convert states to numeric values
      if (this.config.state_map.length > 0 || this.config.entities[index].attribute) {
        rows.forEach((item: HistoryItem) => {
          if (this.config.entities[index].attribute) {
            item.state = this.getObjectAttr(item.attributes as Record<string, unknown>, this.config.entities[index].attribute!);
            delete item.attributes;
          }
          if (this.config.state_map.length > 0)
            this._convertState(item);
        });
      }

      const newStateHistory: HistoryItem[] = rows
        .filter((item) => !Number.isNaN(parseFloat(item.state as string)))
        .map((item) => ({
          last_changed: (this.config.entities[index].attribute ? item.last_updated : item.last_changed) as string,
          state: item.state,
        }));
      stateHistory = [...stateHistory, ...newStateHistory];

      // Save to cache
      if (this.config.cache) {
        setCache(this._md5Config!, `${entity.entity_id}_${index}`, {
          hours_to_show: this.config.hours_to_show,
          last_fetched: new Date(),
          data: stateHistory,
          version,
        }, this.config.compress)
          .catch((err) => {
            log(err);
            localForage.clear();
          });
      }
    }

    if (stateHistory.length === 0) return;

    if (this.entity[0] && entity.entity_id === this.entity[0].entity_id) {
      this.updateExtrema(stateHistory);
    }

    if (this.config.entities[index].fixed_value === true) {
      const last = stateHistory[stateHistory.length - 1];
      this.Graph[index].history = [last, last];
    } else {
      this.Graph[index].history = stateHistory;
    }
  }

  updateExtrema(history: any[]): void {
    const { extrema, average } = this.config.show;
    this.abs = [
      ...(extrema ? [{
        type: 'min' as const,
        ...getMin(history, 'state'),
      }] : []),
      ...(average ? [{
        type: 'avg' as const,
        state: getAvg(history, 'state'),
      }] : []),
      ...(extrema ? [{
        type: 'max' as const,
        ...getMax(history, 'state'),
      }] : []),
    ] as AbsEntry[];
  }

  _convertState(res: { state: any }): void {
    const resultIndex = this.config.state_map.findIndex((s) => s.value === res.state);
    if (resultIndex === -1) {
      return;
    }

    res.state = resultIndex;
  }

  getEndDate(): Date {
    const date = new Date();
    switch (this.config.group_by) {
      case 'date':
        date.setDate(date.getDate() + 1);
        date.setHours(0, 0, 0);
        break;
      case 'hour':
        date.setHours(date.getHours() + 1);
        date.setMinutes(0, 0);
        break;
      default:
        break;
    }
    return date;
  }

  setNextUpdate(): void {
    if (!this.config.update_interval) {
      const interval = 1 / this.config.points_per_hour;
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        if (!this.updating) this.updateData();
      }, interval * ONE_HOUR);
    }
  }

  // Sections view (HA 2025+): graphs benefit from width, so default to full
  // width; rows track the configured content height. columns stay multiples of 3.
  getGridOptions() {
    return {
      columns: 12,
      rows: Math.max(2, this.calculateCardSize()),
      min_columns: 6,
      min_rows: 1,
    };
  }

  getCardSize(): number {
    // Prefer measuring the rendered height to match HA's new layout behavior
    try {
      const card = this.shadowRoot && this.shadowRoot.querySelector('ha-card');
      if (card && card.getBoundingClientRect) {
        const measured = Math.ceil(card.getBoundingClientRect().height / 50);
        if (Number.isFinite(measured) && measured > 0) return measured;
      }
    } catch {
      // noop – fall back to calculated size below
    }
    return this.config.card_size || this.calculateCardSize();
  }

  calculateCardSize(): number {
    let size = 1; // Base size

    // Add size for header (name/icon)
    if (this.config.show.name || this.config.show.icon) size += 1;

    // Add size for state display
    if (this.config.show.state) size += 1;

    // Add size based on graph height
    if (this.config.show.graph) {
      size += Math.ceil(this.config.height / 50);
    }

    // Add size for legend
    if (this.config.show.legend && this.visibleLegends.length > 1) size += 1;

    // Add size for info section (min/max/avg)
    if (this.abs && this.abs.length > 0) size += 1;

    return size;
  }

  // Visual editor (custom element defined in ./editor/editor).
  static getConfigElement(): HTMLElement {
    return document.createElement('mini-graph-card-editor');
  }

  // Stub config for the Lovelace card picker. Picks a real numeric entity when
  // one is available so the preview shows live data; `entities` (not `entity`)
  // is what buildConfig requires.
  static getStubConfig(hass?: HomeAssistant): Record<string, unknown> {
    const entity = hass
      ? Object.keys(hass.states).find((id) => isNumericEntity(hass, id))
      : undefined;
    return { entities: [entity || 'sensor.example'] };
  }
}

customElements.define('mini-graph-card', MiniGraphCard);

// Entities the card can graph out of the box: the inherently-numeric domains,
// plus sensors that expose a unit or a state_class (i.e. numeric sensors).
const NUMERIC_DOMAINS = ['counter', 'input_number', 'number'];

const isNumericEntity = (hass: HomeAssistant, entityId: string): boolean => {
  const domain = entityId.split('.')[0];
  if (NUMERIC_DOMAINS.includes(domain)) return true;
  if (domain !== 'sensor') return false;

  const stateObj = hass.states[entityId];
  if (!stateObj) return false;
  return !!stateObj.attributes.unit_of_measurement || !!stateObj.attributes.state_class;
};

// Configure the preview in the Lovelace card picker.
// No hass at module-load time, so the picker name/description resolve via the
// browser language (navigator) — this is by design, not a fallback bug.
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'mini-graph-card',
  name: localize('card.picker.name'),
  preview: true,
  description: localize('card.picker.description'),
  documentationURL: 'https://github.com/foXaCe/mini-graph-card',
  // Offer the card as a suggestion when a numeric entity is added to a
  // dashboard (Home Assistant 2026.6+ card-picker entity suggestion).
  getEntitySuggestion: (hass: HomeAssistant, entityId: string) => (isNumericEntity(hass, entityId)
    ? { config: { type: 'custom:mini-graph-card', entities: [{ entity: entityId }] } }
    : null),
});
