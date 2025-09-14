import { LitElement, html, css } from 'lit-element';
import { fireEvent } from 'custom-card-helpers';

const sections = {
  required: {
    icon: 'tune',
    name: 'Required Settings',
    secondary: 'Basic configuration required for the card',
    show: true,
  },
  display: {
    icon: 'card-text-outline',
    name: 'Display Options',
    secondary: 'Name, icon, and visual appearance settings',
    show: false,
  },
  graph: {
    icon: 'chart-line',
    name: 'Graph Settings',
    secondary: 'Graph type, colors, and visual properties',
    show: false,
  },
  data: {
    icon: 'database',
    name: 'Data & Time',
    secondary: 'Data aggregation and time configuration',
    show: false,
  },
  bounds: {
    icon: 'arrow-expand-vertical',
    name: 'Scale & Bounds',
    secondary: 'Y-axis bounds and scaling options',
    show: false,
  },
  colors: {
    icon: 'palette',
    name: 'Colors & Thresholds',
    secondary: 'Color configuration and dynamic thresholds',
    show: false,
  },
  advanced: {
    icon: 'cog',
    name: 'Advanced Options',
    secondary: 'Performance, caching, and advanced settings',
    show: false,
  },
  entities: {
    icon: 'format-list-bulleted',
    name: 'Entity Configuration',
    secondary: 'Individual entity settings and overrides',
    show: false,
  },
};


const aggregateFunctions = [
  { value: 'avg', label: 'Average' },
  { value: 'median', label: 'Median' },
  { value: 'min', label: 'Minimum' },
  { value: 'max', label: 'Maximum' },
  { value: 'first', label: 'First' },
  { value: 'last', label: 'Last' },
  { value: 'sum', label: 'Sum' },
  { value: 'delta', label: 'Delta' },
  { value: 'diff', label: 'Difference' },
];

const alignmentOptions = [
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
  { value: 'center', label: 'Center' },
];

const tapActions = [
  { value: 'more-info', label: 'More Info' },
  { value: 'navigate', label: 'Navigate' },
  { value: 'call-service', label: 'Call Service' },
  { value: 'url', label: 'Open URL' },
  { value: 'none', label: 'No Action' },
];

export default class MiniGraphCardEditor extends LitElement {
  static get properties() {
    return {
      hass: Object,
      _config: Object,
      _toggle: Object,
    };
  }

  setConfig(config) {
    this._config = { ...config };
    this._toggle = {};
    Object.keys(sections).forEach((section) => {
      this._toggle[section] = sections[section].show;
    });
  }

  // Helper methods for getting config values with defaults
  get _entity() { return this._config.entity || ''; }

  get _entities() { return this._config.entities || []; }

  get _name() { return this._config.name || ''; }

  get _icon() { return this._config.icon || ''; }

  get _icon_image() { return this._config.icon_image || ''; }

  get _unit() { return this._config.unit || ''; }

  get _height() { return this._config.height || 100; }

  get _line_width() { return this._config.line_width || 5; }

  get _line_color() { return Array.isArray(this._config.line_color) ? this._config.line_color.join(', ') : (this._config.line_color || ''); }

  get _bar_spacing() { return this._config.bar_spacing || 4; }

  get _animate() { return this._config.animate !== false; }

  get _hours_to_show() { return this._config.hours_to_show || 24; }

  get _points_per_hour() { return this._config.points_per_hour || 0.5; }

  get _aggregate_func() { return this._config.aggregate_func || 'avg'; }

  get _group_by() { return this._config.group_by || 'interval'; }

  get _update_interval() { return this._config.update_interval || ''; }

  get _hour24() { return this._config.hour24 || false; }

  get _lower_bound() { return this._config.lower_bound !== undefined ? this._config.lower_bound : ''; }

  get _upper_bound() { return this._config.upper_bound !== undefined ? this._config.upper_bound : ''; }

  get _min_bound_range() { return this._config.min_bound_range || ''; }

  get _lower_bound_secondary() { return this._config.lower_bound_secondary !== undefined ? this._config.lower_bound_secondary : ''; }

  get _upper_bound_secondary() { return this._config.upper_bound_secondary !== undefined ? this._config.upper_bound_secondary : ''; }

  get _min_bound_range_secondary() { return this._config.min_bound_range_secondary || ''; }

  get _smoothing() { return this._config.smoothing !== false; }

  get _logarithmic() { return this._config.logarithmic || false; }

  get _color_thresholds() { return this._config.color_thresholds || []; }

  get _color_thresholds_transition() { return this._config.color_thresholds_transition || 'smooth'; }

  get _font_size() { return this._config.font_size || 100; }

  get _font_size_header() { return this._config.font_size_header || 14; }

  get _align_header() { return this._config.align_header || 'default'; }

  get _align_icon() { return this._config.align_icon || 'right'; }

  get _align_state() { return this._config.align_state || 'left'; }

  get _decimals() { return this._config.decimals !== undefined ? this._config.decimals : ''; }

  get _value_factor() { return this._config.value_factor || 0; }

  get _cache() { return this._config.cache !== false; }

  get _compress() { return this._config.compress !== false; }

  get _group() { return this._config.group || false; }

  get _show() { return this._config.show || {}; }

  get _tap_action() { return this._config.tap_action || { action: 'more-info' }; }

  get _state_map() { return this._config.state_map || []; }

  render() {
    if (!this.hass) {
      return html``;
    }

    return html`
      <div class="card-config">
        <div class="header">
          <div class="title">Mini Graph Card Configuration</div>
          <div class="subtitle">Complete configuration for all YAML options</div>
        </div>

        ${Object.keys(sections).map(section => this.renderSection(section))}
      </div>
    `;
  }

  renderSection(section) {
    const { icon, name, secondary } = sections[section];
    const isToggled = this._toggle[section];

    return html`
      <div class="section">
        <div
          class="section-header ${isToggled ? 'expanded' : ''}"
          @click="${() => this._toggleSection(section)}"
        >
          <ha-icon icon="mdi:${icon}"></ha-icon>
          <div class="section-info">
            <div class="section-name">${name}</div>
            <div class="section-secondary">${secondary}</div>
          </div>
          <ha-icon
            class="section-toggle"
            icon="mdi:chevron-${isToggled ? 'up' : 'down'}"
          ></ha-icon>
        </div>
        ${isToggled ? this.renderSectionContent(section) : ''}
      </div>
    `;
  }

  renderSectionContent(section) {
    switch (section) {
      case 'required': return this.renderRequired();
      case 'display': return this.renderDisplay();
      case 'graph': return this.renderGraph();
      case 'data': return this.renderData();
      case 'bounds': return this.renderBounds();
      case 'colors': return this.renderColors();
      case 'advanced': return this.renderAdvanced();
      case 'entities': return this.renderEntities();
      default: return html``;
    }
  }

  renderRequired() {
    return html`
      <div class="section-content">
        ${this._entities.length === 0 ? html`
          <div class="form-group">
            <ha-entity-picker
              label="Primary Entity (will be converted to entities list)"
              .hass="${this.hass}"
              .value="${this._entity}"
              @value-changed="${this._entityChanged}"
              allow-custom-entity
            ></ha-entity-picker>
          </div>
        ` : ''}

        <div class="form-group">
          <label class="form-label">Entities List</label>
          ${this._entities.map((entity, index) => html`
            <div class="entity-row">
              <ha-entity-picker
                .hass="${this.hass}"
                .value="${typeof entity === 'string' ? entity : entity.entity}"
                @value-changed="${ev => this._entityListChanged(ev, index)}"
                allow-custom-entity
              ></ha-entity-picker>
              <mwc-button
                outlined
                @click="${() => this._removeEntity(index)}"
              >Remove</mwc-button>
            </div>
          `)}
          <mwc-button
            outlined
            @click="${this._addEntity}"
          >Add Entity</mwc-button>
        </div>
      </div>
    `;
  }

  renderDisplay() {
    return html`
      <div class="section-content">
        <div class="form-row">
          <div class="form-group">
            <ha-textfield
              label="Name"
              .value="${this._name}"
              .configValue="${'name'}"
              @input="${this._valueChanged}"
            ></ha-textfield>
          </div>

          <div class="form-group">
            <ha-icon-picker
              label="Icon"
              .value="${this._icon}"
              .configValue="${'icon'}"
              .hass="${this.hass}"
              @value-changed="${this._valueChanged}"
            ></ha-icon-picker>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <ha-textfield
              label="Icon Image URL"
              .value="${this._icon_image}"
              .configValue="${'icon_image'}"
              @input="${this._valueChanged}"
            ></ha-textfield>
          </div>

          <div class="form-group">
            <ha-textfield
              label="Unit"
              .value="${this._unit}"
              .configValue="${'unit'}"
              @input="${this._valueChanged}"
            ></ha-textfield>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <ha-textfield
              label="Font Size (%)"
              type="number"
              min="50"
              max="200"
              .value="${this._font_size}"
              .configValue="${'font_size'}"
              @input="${this._valueChanged}"
            ></ha-textfield>
          </div>

          <div class="form-group">
            <ha-textfield
              label="Header Font Size (px)"
              type="number"
              min="8"
              max="32"
              .value="${this._font_size_header}"
              .configValue="${'font_size_header'}"
              @input="${this._valueChanged}"
            ></ha-textfield>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <ha-select
              label="Header Alignment"
              .value="${this._align_header}"
              .configValue="${'align_header'}"
              @selected="${this._valueChanged}"
            >
              <mwc-list-item value="default">Default</mwc-list-item>
              ${alignmentOptions.map(option => html`
                <mwc-list-item value="${option.value}">${option.label}</mwc-list-item>
              `)}
            </ha-select>
          </div>

          <div class="form-group">
            <ha-select
              label="Icon Alignment"
              .value="${this._align_icon}"
              .configValue="${'align_icon'}"
              @selected="${this._valueChanged}"
            >
              ${alignmentOptions.map(option => html`
                <mwc-list-item value="${option.value}">${option.label}</mwc-list-item>
              `)}
              <mwc-list-item value="state">With State</mwc-list-item>
            </ha-select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <ha-select
              label="State Alignment"
              .value="${this._align_state}"
              .configValue="${'align_state'}"
              @selected="${this._valueChanged}"
            >
              ${alignmentOptions.map(option => html`
                <mwc-list-item value="${option.value}">${option.label}</mwc-list-item>
              `)}
            </ha-select>
          </div>

          <div class="form-group">
            <ha-textfield
              label="Decimal Places"
              type="number"
              min="0"
              max="10"
              .value="${this._decimals}"
              .configValue="${'decimals'}"
              @input="${this._valueChanged}"
            ></ha-textfield>
          </div>
        </div>

        <div class="show-options">
          <div class="show-header">Visibility Options</div>
          ${this.renderShowOptions()}
        </div>
      </div>
    `;
  }

  renderGraph() {
    return html`
      <div class="section-content">
        <div class="form-row">
          <div class="form-group">
            <ha-textfield
              label="Height (px)"
              type="number"
              min="50"
              max="500"
              .value="${this._height}"
              .configValue="${'height'}"
              @input="${this._valueChanged}"
            ></ha-textfield>
          </div>

          <div class="form-group">
            <ha-textfield
              label="Line Width"
              type="number"
              min="1"
              max="20"
              .value="${this._line_width}"
              .configValue="${'line_width'}"
              @input="${this._valueChanged}"
            ></ha-textfield>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <ha-textfield
              label="Line Colors (comma-separated)"
              .value="${this._line_color}"
              .configValue="${'line_color'}"
              @input="${this._valueChanged}"
            ></ha-textfield>
          </div>

          <div class="form-group">
            <ha-textfield
              label="Bar Spacing"
              type="number"
              min="0"
              max="20"
              .value="${this._bar_spacing}"
              .configValue="${'bar_spacing'}"
              @input="${this._valueChanged}"
            ></ha-textfield>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <ha-formfield label="Enable Animation">
              <ha-switch
                .checked="${this._animate}"
                .configValue="${'animate'}"
                @change="${this._valueChanged}"
              ></ha-switch>
            </ha-formfield>
          </div>

          <div class="form-group">
            <ha-formfield label="Smooth Lines">
              <ha-switch
                .checked="${this._smoothing}"
                .configValue="${'smoothing'}"
                @change="${this._valueChanged}"
              ></ha-switch>
            </ha-formfield>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <ha-formfield label="Logarithmic Scale">
              <ha-switch
                .checked="${this._logarithmic}"
                .configValue="${'logarithmic'}"
                @change="${this._valueChanged}"
              ></ha-switch>
            </ha-formfield>
          </div>

          <div class="form-group">
            <ha-textfield
              label="Value Factor (scale by 10^n)"
              type="number"
              .value="${this._value_factor}"
              .configValue="${'value_factor'}"
              @input="${this._valueChanged}"
            ></ha-textfield>
          </div>
        </div>
      </div>
    `;
  }

  renderData() {
    return html`
      <div class="section-content">
        <div class="form-row">
          <div class="form-group">
            <ha-textfield
              label="Hours to Show"
              type="number"
              min="1"
              max="168"
              .value="${this._hours_to_show}"
              .configValue="${'hours_to_show'}"
              @input="${this._valueChanged}"
            ></ha-textfield>
          </div>

          <div class="form-group">
            <ha-textfield
              label="Points per Hour"
              type="number"
              min="0.1"
              max="60"
              step="0.1"
              .value="${this._points_per_hour}"
              .configValue="${'points_per_hour'}"
              @input="${this._valueChanged}"
            ></ha-textfield>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <ha-select
              label="Aggregate Function"
              .value="${this._aggregate_func}"
              .configValue="${'aggregate_func'}"
              @selected="${this._valueChanged}"
            >
              ${aggregateFunctions.map(option => html`
                <mwc-list-item value="${option.value}">${option.label}</mwc-list-item>
              `)}
            </ha-select>
          </div>

          <div class="form-group">
            <ha-select
              label="Group By"
              .value="${this._group_by}"
              .configValue="${'group_by'}"
              @selected="${this._valueChanged}"
            >
              <mwc-list-item value="interval">Interval</mwc-list-item>
              <mwc-list-item value="date">Date</mwc-list-item>
              <mwc-list-item value="hour">Hour</mwc-list-item>
            </ha-select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <ha-textfield
              label="Update Interval (seconds)"
              type="number"
              min="1"
              .value="${this._update_interval}"
              .configValue="${'update_interval'}"
              @input="${this._valueChanged}"
            ></ha-textfield>
          </div>

          <div class="form-group">
            <ha-formfield label="24-Hour Time Format">
              <ha-switch
                .checked="${this._hour24}"
                .configValue="${'hour24'}"
                @change="${this._valueChanged}"
              ></ha-switch>
            </ha-formfield>
          </div>
        </div>
      </div>
    `;
  }

  renderBounds() {
    return html`
      <div class="section-content">
        <div class="bounds-section">
          <div class="bounds-title">Primary Y-Axis</div>
          <div class="form-row">
            <div class="form-group">
              <ha-textfield
                label="Lower Bound (use ~N for soft)"
                .value="${this._lower_bound}"
                .configValue="${'lower_bound'}"
                @input="${this._valueChanged}"
              ></ha-textfield>
            </div>

            <div class="form-group">
              <ha-textfield
                label="Upper Bound (use ~N for soft)"
                .value="${this._upper_bound}"
                .configValue="${'upper_bound'}"
                @input="${this._valueChanged}"
              ></ha-textfield>
            </div>
          </div>

          <div class="form-group">
            <ha-textfield
              label="Minimum Range"
              type="number"
              min="0"
              .value="${this._min_bound_range}"
              .configValue="${'min_bound_range'}"
              @input="${this._valueChanged}"
            ></ha-textfield>
          </div>
        </div>

        <div class="bounds-section">
          <div class="bounds-title">Secondary Y-Axis</div>
          <div class="form-row">
            <div class="form-group">
              <ha-textfield
                label="Lower Bound (use ~N for soft)"
                .value="${this._lower_bound_secondary}"
                .configValue="${'lower_bound_secondary'}"
                @input="${this._valueChanged}"
              ></ha-textfield>
            </div>

            <div class="form-group">
              <ha-textfield
                label="Upper Bound (use ~N for soft)"
                .value="${this._upper_bound_secondary}"
                .configValue="${'upper_bound_secondary'}"
                @input="${this._valueChanged}"
              ></ha-textfield>
            </div>
          </div>

          <div class="form-group">
            <ha-textfield
              label="Minimum Range"
              type="number"
              min="0"
              .value="${this._min_bound_range_secondary}"
              .configValue="${'min_bound_range_secondary'}"
              @input="${this._valueChanged}"
            ></ha-textfield>
          </div>
        </div>
      </div>
    `;
  }

  renderColors() {
    return html`
      <div class="section-content">
        <div class="form-group">
          <ha-select
            label="Threshold Transition"
            .value="${this._color_thresholds_transition}"
            .configValue="${'color_thresholds_transition'}"
            @selected="${this._valueChanged}"
          >
            <mwc-list-item value="smooth">Smooth</mwc-list-item>
            <mwc-list-item value="hard">Hard</mwc-list-item>
          </ha-select>
        </div>

        <div class="thresholds-section">
          <div class="thresholds-header">
            <span class="thresholds-title">Color Thresholds</span>
            <mwc-button
              outlined
              @click="${this._addThreshold}"
            >Add Threshold</mwc-button>
          </div>

          ${this._color_thresholds.map((threshold, index) => html`
            <div class="threshold-row">
              <ha-textfield
                label="Value"
                type="number"
                .value="${threshold.value}"
                @input="${ev => this._thresholdChanged(ev, index, 'value')}"
              ></ha-textfield>
              <input
                type="color"
                .value="${threshold.color}"
                @input="${ev => this._thresholdChanged(ev, index, 'color')}"
              />
              <mwc-button
                outlined
                @click="${() => this._removeThreshold(index)}"
              >Remove</mwc-button>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  renderAdvanced() {
    return html`
      <div class="section-content">
        <div class="form-row">
          <div class="form-group">
            <ha-formfield label="Enable Caching">
              <ha-switch
                .checked="${this._cache}"
                .configValue="${'cache'}"
                @change="${this._valueChanged}"
              ></ha-switch>
            </ha-formfield>
          </div>

          <div class="form-group">
            <ha-formfield label="Enable Compression">
              <ha-switch
                .checked="${this._compress}"
                .configValue="${'compress'}"
                @change="${this._valueChanged}"
              ></ha-switch>
            </ha-formfield>
          </div>
        </div>

        <div class="form-group">
          <ha-formfield label="Group Mode (remove padding/shadow)">
            <ha-switch
              .checked="${this._group}"
              .configValue="${'group'}"
              @change="${this._valueChanged}"
            ></ha-switch>
          </ha-formfield>
        </div>

        <div class="tap-action-section">
          <div class="tap-action-title">Tap Action</div>
          <div class="form-row">
            <div class="form-group">
              <ha-select
                label="Action Type"
                .value="${this._tap_action.action}"
                @selected="${ev => this._tapActionChanged(ev, 'action')}"
              >
                ${tapActions.map(option => html`
                  <mwc-list-item value="${option.value}">${option.label}</mwc-list-item>
                `)}
              </ha-select>
            </div>

            ${this._tap_action.action === 'navigate' ? html`
              <div class="form-group">
                <ha-textfield
                  label="Navigation Path"
                  .value="${this._tap_action.navigation_path || ''}"
                  @input="${ev => this._tapActionChanged(ev, 'navigation_path')}"
                ></ha-textfield>
              </div>
            ` : ''}

            ${this._tap_action.action === 'url' ? html`
              <div class="form-group">
                <ha-textfield
                  label="URL"
                  .value="${this._tap_action.url || ''}"
                  @input="${ev => this._tapActionChanged(ev, 'url')}"
                ></ha-textfield>
              </div>
            ` : ''}

            ${this._tap_action.action === 'call-service' ? html`
              <div class="form-group">
                <ha-textfield
                  label="Service"
                  .value="${this._tap_action.service || ''}"
                  @input="${ev => this._tapActionChanged(ev, 'service')}"
                ></ha-textfield>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  renderEntities() {
    return html`
      <div class="section-content">
        <div class="entities-info">
          Configure individual entity settings. These override global settings for specific entities.
        </div>

        ${this._entities.map((entity, index) => html`
          <div class="entity-config">
            <div class="entity-config-header">
              <span class="entity-name">${typeof entity === 'string' ? entity : entity.entity}</span>
              <mwc-button
                outlined
                @click="${() => this._toggleEntityConfig(index)}"
              >Configure</mwc-button>
            </div>

            ${this._isEntityConfigExpanded(index) ? this.renderEntityConfig(entity, index) : ''}
          </div>
        `)}
      </div>
    `;
  }

  renderEntityConfig(entity, index) {
    const config = typeof entity === 'string' ? {} : entity;

    return html`
      <div class="entity-config-content">
        <div class="form-row">
          <div class="form-group">
            <ha-textfield
              label="Custom Name"
              .value="${config.name || ''}"
              @input="${ev => this._entityConfigChanged(ev, index, 'name')}"
            ></ha-textfield>
          </div>

          <div class="form-group">
            <ha-textfield
              label="Custom Color"
              .value="${config.color || ''}"
              @input="${ev => this._entityConfigChanged(ev, index, 'color')}"
            ></ha-textfield>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <ha-textfield
              label="Attribute (instead of state)"
              .value="${config.attribute || ''}"
              @input="${ev => this._entityConfigChanged(ev, index, 'attribute')}"
            ></ha-textfield>
          </div>

          <div class="form-group">
            <ha-select
              label="Y-Axis"
              .value="${config.y_axis || 'primary'}"
              @selected="${ev => this._entityConfigChanged(ev, index, 'y_axis')}"
            >
              <mwc-list-item value="primary">Primary</mwc-list-item>
              <mwc-list-item value="secondary">Secondary</mwc-list-item>
            </ha-select>
          </div>
        </div>

        <div class="entity-switches">
          ${[
    { key: 'show_state', label: 'Show State' },
    { key: 'show_graph', label: 'Show in Graph' },
    { key: 'show_line', label: 'Show Line' },
    { key: 'show_fill', label: 'Show Fill' },
    { key: 'show_points', label: 'Show Points' },
    { key: 'show_legend', label: 'Show in Legend' },
    { key: 'smoothing', label: 'Smoothing' },
    { key: 'fixed_value', label: 'Fixed Value' },
  ].map(option => html`
            <ha-formfield label="${option.label}">
              <ha-switch
                .checked="${config[option.key] !== false}"
                @change="${ev => this._entityConfigChanged(ev, index, option.key)}"
              ></ha-switch>
            </ha-formfield>
          `)}
        </div>
      </div>
    `;
  }

  renderShowOptions() {
    const showOptions = [
      { key: 'name', label: 'Name' },
      { key: 'icon', label: 'Icon' },
      { key: 'state', label: 'State' },
      { key: 'graph', label: 'Graph' },
      { key: 'fill', label: 'Fill' },
      { key: 'points', label: 'Points' },
      { key: 'legend', label: 'Legend' },
      { key: 'extrema', label: 'Extrema' },
      { key: 'average', label: 'Average' },
      { key: 'labels', label: 'Labels' },
      { key: 'labels_secondary', label: 'Secondary Labels' },
      { key: 'name_adaptive_color', label: 'Name Adaptive Color' },
      { key: 'icon_adaptive_color', label: 'Icon Adaptive Color' },
    ];

    return html`
      <div class="show-grid">
        ${showOptions.map(option => html`
          <ha-formfield label="${option.label}">
            <ha-switch
              .checked="${this._show[option.key] !== false}"
              .configValue="${option.key}"
              @change="${this._showChanged}"
            ></ha-switch>
          </ha-formfield>
        `)}
      </div>
    `;
  }

  // Event handlers
  _toggleSection(section) {
    this._toggle = { ...this._toggle, [section]: !this._toggle[section] };
  }

  _entityChanged(ev) {
    if (ev.detail.value && !this._entities.length) {
      this._config = { ...this._config, entities: [ev.detail.value] };
      delete this._config.entity;
      fireEvent(this, 'config-changed', { config: this._config });
    }
  }

  _addEntity() {
    const entities = [...this._entities, ''];
    this._config = { ...this._config, entities };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _removeEntity(index) {
    const entities = [...this._entities];
    entities.splice(index, 1);
    this._config = { ...this._config, entities };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _entityListChanged(ev, index) {
    if (!ev.detail.value) return;

    const entities = [...this._entities];
    entities[index] = ev.detail.value;
    this._config = { ...this._config, entities };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _valueChanged(ev) {
    if (!this._config || !this.hass) return;

    const { target } = ev;
    const configValue = target.configValue || (ev.detail && ev.detail.configValue);

    if (!configValue) return;

    let value = target.value !== undefined ? target.value : ev.detail.value;

    if (target.type === 'number') {
      value = Number(value) || 0;
    } else if (target.type === 'checkbox' || target.tagName === 'HA-SWITCH') {
      value = target.checked;
    }

    // Handle special cases
    if (configValue === 'line_color' && value.includes(',')) {
      value = value.split(',').map(c => c.trim());
    }

    this._config = { ...this._config, [configValue]: value };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _showChanged(ev) {
    if (!this._config || !this.hass) return;

    const { target } = ev;
    const { configValue } = target;
    const value = target.checked;

    this._config = {
      ...this._config,
      show: { ...this._show, [configValue]: value },
    };

    fireEvent(this, 'config-changed', { config: this._config });
  }

  _addThreshold() {
    const thresholds = [...this._color_thresholds, { value: 0, color: '#ff0000' }];
    this._config = { ...this._config, color_thresholds: thresholds };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _removeThreshold(index) {
    const thresholds = [...this._color_thresholds];
    thresholds.splice(index, 1);
    this._config = { ...this._config, color_thresholds: thresholds };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _thresholdChanged(ev, index, field) {
    const thresholds = [...this._color_thresholds];
    let { value } = ev.target;

    if (field === 'value') {
      value = Number(value);
    }

    thresholds[index] = { ...thresholds[index], [field]: value };
    this._config = { ...this._config, color_thresholds: thresholds };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _tapActionChanged(ev, field) {
    const value = ev.target.value !== undefined ? ev.target.value : ev.target.value;

    const tapAction = { ...this._tap_action, [field]: value };
    this._config = { ...this._config, tap_action: tapAction };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _toggleEntityConfig(index) {
    // Implementation for expanding/collapsing entity config
    this._expandedEntities = this._expandedEntities || [];
    const isExpanded = this._expandedEntities.includes(index);

    if (isExpanded) {
      this._expandedEntities = this._expandedEntities.filter(i => i !== index);
    } else {
      this._expandedEntities = [...this._expandedEntities, index];
    }

    this.requestUpdate();
  }

  _isEntityConfigExpanded(index) {
    return this._expandedEntities && this._expandedEntities.includes(index);
  }

  _entityConfigChanged(ev, index, field) {
    const entities = [...this._entities];
    const entityConfig = typeof entities[index] === 'string'
      ? { entity: entities[index] }
      : { ...entities[index] };

    let value = ev.target.value !== undefined ? ev.target.value : ev.target.value;

    if (ev.target.tagName === 'HA-SWITCH') {
      value = ev.target.checked;
    }

    entityConfig[field] = value;
    entities[index] = entityConfig;

    this._config = { ...this._config, entities };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  static get styles() {
    return css`
      .card-config {
        padding: 24px;
        background: var(--card-background-color, #ffffff);
        border-radius: 16px;
        box-shadow: var(--ha-card-box-shadow, 0 1px 3px rgba(0,0,0,.12));
      }

      .header {
        margin-bottom: 24px;
        text-align: center;
      }

      .title {
        font-size: 1.5em;
        font-weight: 500;
        color: var(--primary-text-color);
        margin-bottom: 4px;
      }

      .subtitle {
        font-size: 0.9em;
        color: var(--secondary-text-color);
        opacity: 0.7;
      }

      .section {
        margin-bottom: 16px;
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        overflow: hidden;
        background: var(--card-background-color);
      }

      .section-header {
        display: flex;
        align-items: center;
        padding: 16px;
        cursor: pointer;
        background: var(--primary-color);
        color: var(--text-primary-color);
        transition: all 0.2s ease;
      }

      .section-header:hover {
        background: var(--primary-color);
        opacity: 0.9;
      }

      .section-header.expanded {
        border-bottom: 1px solid var(--divider-color);
      }

      .section-header ha-icon {
        margin-right: 12px;
        --mdc-icon-size: 20px;
      }

      .section-info {
        flex: 1;
      }

      .section-name {
        font-weight: 500;
        font-size: 1em;
      }

      .section-secondary {
        font-size: 0.8em;
        opacity: 0.8;
        margin-top: 2px;
      }

      .section-toggle {
        --mdc-icon-size: 18px;
        transition: transform 0.2s ease;
      }

      .section-content {
        padding: 20px;
      }

      .form-group {
        margin-bottom: 16px;
      }

      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-bottom: 16px;
      }

      .form-label {
        display: block;
        font-weight: 500;
        margin-bottom: 8px;
        color: var(--primary-text-color);
      }

      ha-textfield,
      ha-entity-picker,
      ha-icon-picker,
      ha-select {
        width: 100%;
      }

      ha-formfield {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
      }

      .show-options,
      .thresholds-section,
      .tap-action-section {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid var(--divider-color);
      }

      .show-header,
      .thresholds-title,
      .tap-action-title,
      .bounds-title {
        font-weight: 500;
        margin-bottom: 12px;
        color: var(--primary-text-color);
      }

      .show-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 8px;
      }

      .entity-row,
      .threshold-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
      }

      .entity-row ha-entity-picker {
        flex: 1;
      }

      .threshold-row ha-textfield {
        flex: 1;
      }

      .threshold-row input[type="color"] {
        width: 50px;
        height: 40px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      .thresholds-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      .bounds-section {
        margin-bottom: 24px;
        padding: 16px;
        background: var(--secondary-background-color);
        border-radius: 8px;
      }

      .entity-config {
        margin-bottom: 16px;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        overflow: hidden;
      }

      .entity-config-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: var(--secondary-background-color);
      }

      .entity-name {
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .entity-config-content {
        padding: 16px;
      }

      .entity-switches {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 8px;
        margin-top: 16px;
      }

      .entities-info {
        color: var(--secondary-text-color);
        font-size: 0.9em;
        margin-bottom: 20px;
        padding: 12px;
        background: var(--secondary-background-color);
        border-radius: 8px;
      }

      @media (max-width: 600px) {
        .form-row {
          grid-template-columns: 1fr;
        }

        .show-grid {
          grid-template-columns: 1fr;
        }

        .entity-switches {
          grid-template-columns: 1fr;
        }
      }
    `;
  }
}

customElements.define('mini-graph-card-editor', MiniGraphCardEditor);
