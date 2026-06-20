import { LitElement, html, svg } from 'lit-element';
import localForage from 'localforage/src/localforage';
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

import {
  UPDATE_PROPS,
  V,
  ONE_HOUR,
} from './const';
import {
  getMin, getAvg, getMax,
  getTime, getMilli,
  getFirstDefinedItem,
  compareArray,
  log,
} from './utils';

class MiniGraphCard extends LitElement {
  constructor() {
    super();
    this.id = Math.random()
      .toString(36)
      .substr(2, 9);
    this.config = {};
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

  set hass(hass) {
    this._hass = hass;
    let updated = false;
    const queue = [];
    this.config.entities.forEach((entity, index) => {
      this.config.entities[index].index = index; // Required for filtered views
      const entityState = hass && hass.states[entity.entity] || undefined;
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

  static get properties() {
    return {
      id: String,
      _hass: {},
      config: {},
      entity: [],
      Graph: [],
      line: [],
      shadow: [],
      length: Number,
      bound: [],
      boundSecondary: [],
      abs: [],
      tooltip: {},
      updateQueue: [],
      color: String,
    };
  }

  setConfig(config) {
    this.config = buildConfig(config, this.config);
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

  connectedCallback() {
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

  disconnectedCallback() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    super.disconnectedCallback();
  }

  shouldUpdate(changedProps) {
    if (UPDATE_PROPS.some((prop) => changedProps.has(prop))) {
      // Guard against a configured entity that is entirely absent from hass
      // (entity[0] undefined): compute the colour from the value we have, so
      // render() can reach renderWarnings() instead of throwing here.
      const stateValue = this.tooltip.value !== undefined
        ? this.tooltip.value
        : (this.entity[0] !== undefined ? this.getEntityState(0) : undefined);
      this.color = this.computeColor(stateValue, this.tooltip.entity || 0);
      return true;
    }
  }

  firstUpdated() {
    this.initial = false;
  }

  updated(changedProperties) {
    if (this.config.animate && changedProperties.has('line')) {
      if (this.length.length < this.entity.length) {
        this.shadowRoot.querySelectorAll('svg path.line').forEach((ele) => {
          this.length[ele.id] = ele.getTotalLength();
        });
        this.length = [...this.length];
      } else {
        this.length = Array(this.entity.length).fill('none');
      }
    }
  }

  render({ config } = this) {
    if (!config || !this.entity || !this._hass)
      return html``;
    if (this.config.entities.some((_, index) => this.entity[index] === undefined)) {
      return this.renderWarnings();
    }
    return html`
      <ha-card
        class="flex"
        ?group=${config.group}
        ?fill=${config.show.graph && config.show.fill}
        ?points=${config.show.points === 'hover'}
        ?labels=${config.show.labels === 'hover'}
        ?labels-secondary=${config.show.labels_secondary === 'hover'}
        ?gradient=${config.color_thresholds.length > 0}
        ?hover=${config.tap_action.action !== 'none'}
        style="font-size: ${config.font_size}px;"
        @click=${(e) => this.handlePopup(e, config.tap_action.entity || this.entity[0])}
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
          <div class="states--secondary">${this.config.entities.map((_, i) => i > 0 && this.renderState(i) || '')}</div>
          ${this.config.align_icon === 'state' ? this.renderIcon() : ''}
        </div>
      `;
  }

  getObjectAttr(obj, path) {
    return path.split('.').reduce((res, key) => res && res[key], obj);
  }

  getEntityState(id) {
    const entityConfig = this.config.entities[id];
    if (this.config.show.state === 'last') {
      return this.points[id][this.points[id].length - 1][V];
    } else if (entityConfig.attribute) {
      return this.getObjectAttr(this.entity[id].attributes, entityConfig.attribute);
    } else {
      return this.entity[id].state;
    }
  }

  renderState(id) {
    const isPrimary = id === 0; // rendering main state element?
    if (isPrimary || this.config.entities[id].show_state) {
      const state = this.getEntityState(id);
      // use tooltip data for main state element, if tooltip is active
      const { entity: tooltipEntity, value: tooltipValue } = this.tooltip;
      const isTooltip = isPrimary && tooltipEntity !== undefined;
      const value = isTooltip ? tooltipValue : state;
      const entity = isTooltip ? tooltipEntity : id;
      const entityConfig = this.config.entities[entity];
      return html`
        <div
          class="state ${!isPrimary && 'state--small'}"
          @click=${(e) => this.handlePopup(e, this.entity[id])}
          style=${entityConfig.state_adaptive_color ? `color: ${this.computeColor(value, entity)}` : ''}>
          ${entityConfig.show_indicator ? this.renderIndicator(value, entity) : ''}
          <span class="state__value ellipsis">
            ${this.computeState(value)}
          </span>
          <span class="state__uom ellipsis">
            ${this.computeUom(entity)}
          </span>
          ${isPrimary && this.renderStateTime() || ''}
        </div>
      `;
    }
  }

  renderStateTime() {
    if (this.tooltip.value === undefined) return;
    return html`
      <div class="state__time">
        ${this.tooltip.label ? html`
          <span class="tooltip--label">${this.tooltip.label}</span>
        ` : html`
          <span>${this.tooltip.time[0]}</span> -
          <span>${this.tooltip.time[1]}</span>
        `}
      </div>
    `;
  }

  renderGraph() {
    const ready = (this.entity[0] && !this.Graph.some(
      (element, index) => element._history === undefined
      && this.config.entities[index].show_graph !== false,
    ))
    || this.config.show.loading_indicator === false;
    return this.config.show.graph ? html`
      <div class="graph">
        ${ready ? html`
            <div class="graph__container">
              ${this.renderLabels()}
              ${this.renderLabelsSecondary()}
              <div class="graph__container__svg">
                ${renderSvg(this)}
              </div>
            </div>
            ${this.renderLegend()}
        ` : html`<ha-spinner aria-label="${localize('card.a11y.loading', this._hass)}" size="small"></ha-spinner>`}
      </div>` : '';
  }

  computeLegend(index) {
    let legend = this.computeName(index);
    const state = this.getEntityState(index);

    const { show_legend_state = false } = this.config.entities[index];

    if (show_legend_state) {
      legend += ` (${this.computeState(state)}`;
      if (!(['unavailable'].includes(state))) {
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
    if (this.visibleLegends.length <= 1 || !this.config.show.legend) return;

    /* eslint-disable indent */
    return html`
      <div class="graph__legend">
        ${this.visibleLegends.map((entity) => {
          const legend = this.computeLegend(entity.index);
          return html`
            <div class="graph__legend__item"
              @click=${(e) => this.handlePopup(e, this.entity[entity.index])}
              @mouseenter=${() => this.setTooltip(entity.index, -1, this.getEntityState(entity.index), localize('card.labels.current', this._hass))}
              @mouseleave=${() => (this.tooltip = {})}>
              ${this.renderIndicator(this.getEntityState(entity.index), entity.index)}
              <span class="ellipsis">${legend}</span>
            </div>
          `;
        })}
      </div>
    `;
    /* eslint-enable indent */
  }

  renderIndicator(state, index) {
    return svg`
      <svg width='10' height='10'>
        <rect width='10' height='10' fill=${this.computeColor(state, index)} />
      </svg>
    `;
  }

  setTooltip(entity, index, value, label = null) {
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
    if (!this.config.show.labels || this.primaryYaxisSeries.length === 0) return;
    return html`
      <div class="graph__labels --primary flex">
        <span class="label--max">${this.computeState(this.bound[1])}</span>
        <span class="label--min">${this.computeState(this.bound[0])}</span>
      </div>
    `;
  }

  renderLabelsSecondary() {
    if (!this.config.show.labels_secondary || this.secondaryYaxisSeries.length === 0) return;
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
              ${entry.type !== 'avg' ? getTime(new Date(entry.last_changed), this.config.format, this._hass.language) : ''}
            </span>
          </div>
        `)}
      </div>
    ` : html``;
  }

  handlePopup(e, entity) {
    e.stopPropagation();
    handleClick(this, this._hass, this.config, this.config.tap_action, entity.entity_id || entity);
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
    return this.primaryYaxisEntities.map((entity) => this.Graph[entity.index]);
  }

  get secondaryYaxisSeries() {
    return this.secondaryYaxisEntities.map((entity) => this.Graph[entity.index]);
  }

  computeColor(inState, i) {
    return compute.color(this.config, inState, i);
  }

  computeName(index) {
    return compute.name(this.config, this.entity[index], index);
  }

  computeIcon(entity) {
    return compute.icon(this.config, entity);
  }

  computeUom(index) {
    return compute.uom(this.config, this.entity[index], index);
  }

  computeState(inState) {
    return compute.state(this.config, inState, this._hass.language);
  }

  updateOnInterval() {
    if (this.stateChanged && !this.updating) {
      this.stateChanged = false;
      this.updateData();
    }
  }

  async updateData({ config } = this) {
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

  updateBounds({ config } = this) {
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

  async updateEntity(entity, index, initStart, end) {
    if (!entity
      || !this.updateQueue.includes(`${entity.entity_id}-${index}`)
      || this.config.entities[index].show_graph === false
    ) return;
    this.updateQueue = this.updateQueue.filter((entry) => entry !== `${entity.entity_id}-${index}`);

    let stateHistory = [];
    let start = initStart;
    let skipInitialState = false;

    let history = null;
    if (this.config.cache) {
      history = await getCache(this._md5Config, `${entity.entity_id}_${index}`, this.config.compress);
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
          stateHistory[currDataIndex].last_changed = initStart;
        }

        stateHistory = stateHistory.slice(currDataIndex, stateHistory.length);
        // skip initial state when fetching recent/not-cached data
        skipInitialState = true;
      } else {
        // there were no states which could be used in current graph so clearing
        stateHistory = [];
      }

      const lastFetched = new Date(history.last_fetched);
      if (lastFetched > start) {
        start = new Date(lastFetched - 1);
      }
    }

    let newStateHistory = await fetchRecent(
      this._hass,
      entity.entity_id,
      start,
      end,
      this.config.entities[index].attribute ? false : skipInitialState,
      !!this.config.entities[index].attribute,
    );
    if (newStateHistory[0] && newStateHistory[0].length > 0) {
      /**
      * hack because HA doesn't return anything if skipInitialState is false
      * when retrieving for attributes so we retrieve it and we remove it.*
      */
      if (this.config.entities[index].attribute && skipInitialState) {
        newStateHistory[0].shift();
      }
      // check if we should convert states to numeric values
      if (this.config.state_map.length > 0 || this.config.entities[index].attribute) {
        newStateHistory[0].forEach((item) => {
          if (this.config.entities[index].attribute) {
            // eslint-disable-next-line no-param-reassign
            item.state = this.getObjectAttr(item.attributes, this.config.entities[index].attribute);
            // eslint-disable-next-line no-param-reassign
            delete item.attributes;
          }
          if (this.config.state_map.length > 0)
            this._convertState(item);
        });
      }

      newStateHistory = newStateHistory[0].filter((item) => !Number.isNaN(parseFloat(item.state)));
      newStateHistory = newStateHistory.map((item) => ({
        last_changed: this.config.entities[index].attribute ? item.last_updated : item.last_changed,
        state: item.state,
      }));
      stateHistory = [...stateHistory, ...newStateHistory];

      // Save to cache
      if (this.config.cache) {
        setCache(this._md5Config, `${entity.entity_id}_${index}`, {
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

  updateExtrema(history) {
    const { extrema, average } = this.config.show;
    this.abs = [
      ...(extrema ? [{
        type: 'min',
        ...getMin(history, 'state'),
      }] : []),
      ...(average ? [{
        type: 'avg',
        state: getAvg(history, 'state'),
      }] : []),
      ...(extrema ? [{
        type: 'max',
        ...getMax(history, 'state'),
      }] : []),
    ];
  }

  _convertState(res) {
    const resultIndex = this.config.state_map.findIndex((s) => s.value === res.state);
    if (resultIndex === -1) {
      return;
    }

    res.state = resultIndex;
  }

  getEndDate() {
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

  setNextUpdate() {
    if (!this.config.update_interval) {
      const interval = 1 / this.config.points_per_hour;
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        if (!this.updating) this.updateData();
      }, interval * ONE_HOUR);
    }
  }

  getCardSize() {
    // Prefer measuring the rendered height to match HA's new layout behavior
    try {
      const card = this.shadowRoot && this.shadowRoot.querySelector('ha-card');
      if (card && card.getBoundingClientRect) {
        const measured = Math.ceil(card.getBoundingClientRect().height / 50);
        if (Number.isFinite(measured) && measured > 0) return measured;
      }
    } catch (e) {
      // noop – fall back to calculated size below
    }
    return this.config.card_size || this.calculateCardSize();
  }

  calculateCardSize() {
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
}

// Add getConfigElement method for visual editor
MiniGraphCard.getConfigElement = function getConfigElement() {
  return document.createElement('mini-graph-card-editor');
};

// Add stub config for Lovelace card picker
MiniGraphCard.getStubConfig = () => ({
  type: 'custom:mini-graph-card',
  entity: 'sensor.example',
});

customElements.define('mini-graph-card', MiniGraphCard);

// Entities the card can graph out of the box: the inherently-numeric domains,
// plus sensors that expose a unit or a state_class (i.e. numeric sensors).
const NUMERIC_DOMAINS = ['counter', 'input_number', 'number'];

const isNumericEntity = (hass, entityId) => {
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
  preview: false,
  description: localize('card.picker.description'),
  // Offer the card as a suggestion when a numeric entity is added to a
  // dashboard (Home Assistant 2026.6+ card-picker entity suggestion).
  getEntitySuggestion: (hass, entityId) => (isNumericEntity(hass, entityId)
    ? { config: { type: 'custom:mini-graph-card', entities: [{ entity: entityId }] } }
    : null),
});
