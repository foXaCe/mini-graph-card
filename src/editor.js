import { LitElement, html, css } from 'lit-element';
import { fireEvent } from 'custom-card-helpers';

console.log('🔧 Mini Graph Card Editor: Starting to load...');
console.warn('🔧 MINI-GRAPH-CARD EDITOR IS LOADING - DEBUG MODE ACTIVE');
console.trace('🔧 Editor loading trace');

export default class MiniGraphCardEditor extends LitElement {
  static get properties() {
    console.log('🔧 Mini Graph Card Editor: Defining properties...');
    return {
      hass: Object,
      _config: Object,
      _expandedSections: Object,
    };
  }

  constructor() {
    super();
    console.log('🔧 Mini Graph Card Editor: Constructor called');
    this._expandedSections = {
      required: true,
      display: false,
      graph: false,
      data: false,
      bounds: false,
      colors: false,
      advanced: false,
      entities: false,
    };
  }

  setConfig(config) {
    console.log('🔧 Mini Graph Card Editor: setConfig called with:', config);
    this._config = { ...config };
    console.log('🔧 Mini Graph Card Editor: Config set to:', this._config);
  }

  // Configuration getters with logging
  get _entity() {
    const val = (this._config && this._config.entity) || '';
    console.log('🔧 Editor: _entity =', val);
    return val;
  }

  get _entities() {
    const val = (this._config && this._config.entities) || [];
    console.log('🔧 Editor: _entities =', val);
    return val;
  }

  get _name() {
    const val = (this._config && this._config.name) || '';
    console.log('🔧 Editor: _name =', val);
    return val;
  }

  get _icon() {
    const val = (this._config && this._config.icon) || '';
    console.log('🔧 Editor: _icon =', val);
    return val;
  }

  get _icon_image() {
    const val = (this._config && this._config.icon_image) || '';
    console.log('🔧 Editor: _icon_image =', val);
    return val;
  }

  get _unit() {
    const val = (this._config && this._config.unit) || '';
    console.log('🔧 Editor: _unit =', val);
    return val;
  }

  get _height() {
    const val = (this._config && this._config.height) || 100;
    console.log('🔧 Editor: _height =', val);
    return val;
  }

  get _line_width() {
    const val = (this._config && this._config.line_width) || 5;
    console.log('🔧 Editor: _line_width =', val);
    return val;
  }

  get _line_color() {
    const val = Array.isArray(this._config && this._config.line_color)
      ? this._config.line_color.join(', ')
      : ((this._config && this._config.line_color) || '');
    console.log('🔧 Editor: _line_color =', val);
    return val;
  }

  get _bar_spacing() {
    const val = (this._config && this._config.bar_spacing) || 4;
    console.log('🔧 Editor: _bar_spacing =', val);
    return val;
  }

  get _animate() {
    const val = this._config ? (this._config.animate !== false) : true;
    console.log('🔧 Editor: _animate =', val);
    return val;
  }

  get _hours_to_show() {
    const val = (this._config && this._config.hours_to_show) || 24;
    console.log('🔧 Editor: _hours_to_show =', val);
    return val;
  }

  get _points_per_hour() {
    const val = (this._config && this._config.points_per_hour) || 0.5;
    console.log('🔧 Editor: _points_per_hour =', val);
    return val;
  }

  get _aggregate_func() {
    const val = (this._config && this._config.aggregate_func) || 'avg';
    console.log('🔧 Editor: _aggregate_func =', val);
    return val;
  }

  get _group_by() {
    const val = (this._config && this._config.group_by) || 'interval';
    console.log('🔧 Editor: _group_by =', val);
    return val;
  }

  get _update_interval() {
    const val = (this._config && this._config.update_interval) || '';
    console.log('🔧 Editor: _update_interval =', val);
    return val;
  }

  get _hour24() {
    const val = (this._config && this._config.hour24) || false;
    console.log('🔧 Editor: _hour24 =', val);
    return val;
  }

  get _lower_bound() {
    const val = (this._config && this._config.lower_bound !== undefined) ? this._config.lower_bound : '';
    console.log('🔧 Editor: _lower_bound =', val);
    return val;
  }

  get _upper_bound() {
    const val = (this._config && this._config.upper_bound !== undefined) ? this._config.upper_bound : '';
    console.log('🔧 Editor: _upper_bound =', val);
    return val;
  }

  get _min_bound_range() {
    const val = (this._config && this._config.min_bound_range) || '';
    console.log('🔧 Editor: _min_bound_range =', val);
    return val;
  }

  get _smoothing() {
    const val = this._config ? (this._config.smoothing !== false) : true;
    console.log('🔧 Editor: _smoothing =', val);
    return val;
  }

  get _logarithmic() {
    const val = (this._config && this._config.logarithmic) || false;
    console.log('🔧 Editor: _logarithmic =', val);
    return val;
  }

  get _color_thresholds() {
    const val = (this._config && this._config.color_thresholds) || [];
    console.log('🔧 Editor: _color_thresholds =', val);
    return val;
  }

  get _color_thresholds_transition() {
    const val = (this._config && this._config.color_thresholds_transition) || 'smooth';
    console.log('🔧 Editor: _color_thresholds_transition =', val);
    return val;
  }

  get _font_size() {
    const val = (this._config && this._config.font_size) || 100;
    console.log('🔧 Editor: _font_size =', val);
    return val;
  }

  get _font_size_header() {
    const val = (this._config && this._config.font_size_header) || 14;
    console.log('🔧 Editor: _font_size_header =', val);
    return val;
  }

  get _align_header() {
    const val = (this._config && this._config.align_header) || 'default';
    console.log('🔧 Editor: _align_header =', val);
    return val;
  }

  get _align_icon() {
    const val = (this._config && this._config.align_icon) || 'right';
    console.log('🔧 Editor: _align_icon =', val);
    return val;
  }

  get _align_state() {
    const val = (this._config && this._config.align_state) || 'left';
    console.log('🔧 Editor: _align_state =', val);
    return val;
  }

  get _decimals() {
    const val = (this._config && this._config.decimals !== undefined) ? this._config.decimals : '';
    console.log('🔧 Editor: _decimals =', val);
    return val;
  }

  get _cache() {
    const val = this._config ? (this._config.cache !== false) : true;
    console.log('🔧 Editor: _cache =', val);
    return val;
  }

  get _compress() {
    const val = this._config ? (this._config.compress !== false) : true;
    console.log('🔧 Editor: _compress =', val);
    return val;
  }

  get _group() {
    const val = (this._config && this._config.group) || false;
    console.log('🔧 Editor: _group =', val);
    return val;
  }

  get _show() {
    const val = (this._config && this._config.show) || {};
    console.log('🔧 Editor: _show =', val);
    return val;
  }

  get _tap_action() {
    const val = (this._config && this._config.tap_action) || { action: 'more-info' };
    console.log('🔧 Editor: _tap_action =', val);
    return val;
  }

  render() {
    console.log('🔧 Mini Graph Card Editor: render() called');
    console.log('🔧 Mini Graph Card Editor: hass =', !!this.hass);
    console.log('🔧 Mini Graph Card Editor: _config =', this._config);

    if (!this.hass) {
      console.log('🔧 Mini Graph Card Editor: No hass object, showing loading...');
      return html`
        <div class="loading">
          <h3>Loading Home Assistant...</h3>
          <p>Please wait while the editor loads.</p>
        </div>
      `;
    }

    console.log('🔧 Mini Graph Card Editor: Rendering full editor interface');

    try {
      return html`
        <div class="card-config">
          <div class="header">
            <h2>Mini Graph Card Configuration</h2>
            <p>Complete configuration for all options</p>
            <div class="debug-info">
              <small>Debug: Config loaded = ${!!this._config}, Entities = ${this._entities.length}</small>
            </div>
          </div>

          <!-- REQUIRED SETTINGS -->
          ${this.renderSection('required', '🔧 Required Settings', 'Basic configuration required for the card', html`
            ${this._entities.length === 0 ? html`
              <div class="form-group">
                <label>Primary Entity (will be converted to entities list):</label>
                ${this.renderEntityPicker(this._entity, ev => this._primaryEntityChanged(ev))}
              </div>
            ` : ''}

            <div class="form-group">
              <label>Entities List:</label>
              ${this._entities.map((entity, index) => html`
                <div class="entity-row">
                  ${this.renderEntityPicker(
    typeof entity === 'string' ? entity : entity.entity,
    ev => this._entityListChanged(ev, index),
  )}
                  <button class="btn-remove" @click="${() => this._removeEntity(index)}">Remove</button>
                </div>
              `)}
              <button class="btn-add" @click="${this._addEntity}">Add Entity</button>
            </div>
          `)}

          <!-- DISPLAY OPTIONS -->
          ${this.renderSection('display', '🎨 Display Options', 'Name, icon, and visual appearance settings', html`
            <div class="form-row">
              <div class="form-group">
                <label>Card Name:</label>
                <input
                  type="text"
                  .value="${this._name}"
                  @input="${ev => this._valueChanged(ev, 'name')}"
                  placeholder="Card title"
                />
              </div>

              <div class="form-group">
                <label>Icon:</label>
                ${this.renderIconPicker(this._icon, ev => this._valueChanged(ev, 'icon'))}
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Icon Image URL:</label>
                <input
                  type="text"
                  .value="${this._icon_image}"
                  @input="${ev => this._valueChanged(ev, 'icon_image')}"
                  placeholder="https://example.com/image.png"
                />
              </div>

              <div class="form-group">
                <label>Unit:</label>
                <input
                  type="text"
                  .value="${this._unit}"
                  @input="${ev => this._valueChanged(ev, 'unit')}"
                  placeholder="°C, kW, etc."
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Font Size (%):</label>
                <input
                  type="number"
                  min="50"
                  max="200"
                  .value="${this._font_size}"
                  @input="${ev => this._valueChanged(ev, 'font_size')}"
                />
              </div>

              <div class="form-group">
                <label>Header Font Size (px):</label>
                <input
                  type="number"
                  min="8"
                  max="32"
                  .value="${this._font_size_header}"
                  @input="${ev => this._valueChanged(ev, 'font_size_header')}"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Header Alignment:</label>
                <select .value="${this._align_header}" @change="${ev => this._valueChanged(ev, 'align_header')}">
                  <option value="default">Default</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                  <option value="center">Center</option>
                </select>
              </div>

              <div class="form-group">
                <label>Icon Alignment:</label>
                <select .value="${this._align_icon}" @change="${ev => this._valueChanged(ev, 'align_icon')}">
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                  <option value="center">Center</option>
                  <option value="state">With State</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>State Alignment:</label>
                <select .value="${this._align_state}" @change="${ev => this._valueChanged(ev, 'align_state')}">
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                  <option value="center">Center</option>
                </select>
              </div>

              <div class="form-group">
                <label>Decimal Places:</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  .value="${this._decimals}"
                  @input="${ev => this._valueChanged(ev, 'decimals')}"
                />
              </div>
            </div>

            <div class="show-options">
              <h4>Visibility Options</h4>
              <div class="checkbox-grid">
                ${[
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
  ].map(option => html`
                  <label class="checkbox-item">
                    <input
                      type="checkbox"
                      .checked="${this._show[option.key] !== false}"
                      @change="${ev => this._showChanged(ev, option.key)}"
                    />
                    ${option.label}
                  </label>
                `)}
              </div>
            </div>
          `)}

          <!-- GRAPH SETTINGS -->
          ${this.renderSection('graph', '📊 Graph Settings', 'Graph type, colors, and visual properties', html`
            <div class="form-row">
              <div class="form-group">
                <label>Height (px):</label>
                <input
                  type="number"
                  min="50"
                  max="500"
                  .value="${this._height}"
                  @input="${ev => this._valueChanged(ev, 'height')}"
                />
              </div>

              <div class="form-group">
                <label>Line Width:</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  .value="${this._line_width}"
                  @input="${ev => this._valueChanged(ev, 'line_width')}"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Line Colors (comma-separated):</label>
                <input
                  type="text"
                  .value="${this._line_color}"
                  @input="${ev => this._valueChanged(ev, 'line_color')}"
                  placeholder="#ff0000, #00ff00, #0000ff"
                />
              </div>

              <div class="form-group">
                <label>Bar Spacing:</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  .value="${this._bar_spacing}"
                  @input="${ev => this._valueChanged(ev, 'bar_spacing')}"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    .checked="${this._animate}"
                    @change="${ev => this._valueChanged(ev, 'animate')}"
                  />
                  Enable Animation
                </label>
              </div>

              <div class="form-group">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    .checked="${this._smoothing}"
                    @change="${ev => this._valueChanged(ev, 'smoothing')}"
                  />
                  Smooth Lines
                </label>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    .checked="${this._logarithmic}"
                    @change="${ev => this._valueChanged(ev, 'logarithmic')}"
                  />
                  Logarithmic Scale
                </label>
              </div>
            </div>
          `)}

          <!-- DATA & TIME -->
          ${this.renderSection('data', '⏱️ Data & Time', 'Data aggregation and time configuration', html`
            <div class="form-row">
              <div class="form-group">
                <label>Hours to Show:</label>
                <input
                  type="number"
                  min="1"
                  max="168"
                  .value="${this._hours_to_show}"
                  @input="${ev => this._valueChanged(ev, 'hours_to_show')}"
                />
              </div>

              <div class="form-group">
                <label>Points per Hour:</label>
                <input
                  type="number"
                  min="0.1"
                  max="60"
                  step="0.1"
                  .value="${this._points_per_hour}"
                  @input="${ev => this._valueChanged(ev, 'points_per_hour')}"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Aggregate Function:</label>
                <select .value="${this._aggregate_func}" @change="${ev => this._valueChanged(ev, 'aggregate_func')}">
                  <option value="avg">Average</option>
                  <option value="median">Median</option>
                  <option value="min">Minimum</option>
                  <option value="max">Maximum</option>
                  <option value="first">First</option>
                  <option value="last">Last</option>
                  <option value="sum">Sum</option>
                  <option value="delta">Delta</option>
                  <option value="diff">Difference</option>
                </select>
              </div>

              <div class="form-group">
                <label>Group By:</label>
                <select .value="${this._group_by}" @change="${ev => this._valueChanged(ev, 'group_by')}">
                  <option value="interval">Interval</option>
                  <option value="date">Date</option>
                  <option value="hour">Hour</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Update Interval (seconds):</label>
                <input
                  type="number"
                  min="1"
                  .value="${this._update_interval}"
                  @input="${ev => this._valueChanged(ev, 'update_interval')}"
                />
              </div>

              <div class="form-group">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    .checked="${this._hour24}"
                    @change="${ev => this._valueChanged(ev, 'hour24')}"
                  />
                  24-Hour Time Format
                </label>
              </div>
            </div>
          `)}

          <!-- SCALE & BOUNDS -->
          ${this.renderSection('bounds', '📏 Scale & Bounds', 'Y-axis bounds and scaling options', html`
            <h4>Primary Y-Axis</h4>
            <div class="form-row">
              <div class="form-group">
                <label>Lower Bound (use ~N for soft):</label>
                <input
                  type="text"
                  .value="${this._lower_bound}"
                  @input="${ev => this._valueChanged(ev, 'lower_bound')}"
                  placeholder="0 or ~0"
                />
              </div>

              <div class="form-group">
                <label>Upper Bound (use ~N for soft):</label>
                <input
                  type="text"
                  .value="${this._upper_bound}"
                  @input="${ev => this._valueChanged(ev, 'upper_bound')}"
                  placeholder="100 or ~100"
                />
              </div>
            </div>

            <div class="form-group">
              <label>Minimum Range:</label>
              <input
                type="number"
                min="0"
                .value="${this._min_bound_range}"
                @input="${ev => this._valueChanged(ev, 'min_bound_range')}"
              />
            </div>
          `)}

          <!-- COLORS & THRESHOLDS -->
          ${this.renderSection('colors', '🎨 Colors & Thresholds', 'Color configuration and dynamic thresholds', html`
            <div class="form-group">
              <label>Threshold Transition:</label>
              <select .value="${this._color_thresholds_transition}" @change="${ev => this._valueChanged(ev, 'color_thresholds_transition')}">
                <option value="smooth">Smooth</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div class="thresholds-section">
              <div class="thresholds-header">
                <h4>Color Thresholds</h4>
                <button class="btn-add" @click="${this._addThreshold}">Add Threshold</button>
              </div>

              ${this._color_thresholds.map((threshold, index) => html`
                <div class="threshold-row">
                  <input
                    type="number"
                    .value="${threshold.value}"
                    @input="${ev => this._thresholdChanged(ev, index, 'value')}"
                    placeholder="Value"
                  />
                  <input
                    type="color"
                    .value="${threshold.color}"
                    @input="${ev => this._thresholdChanged(ev, index, 'color')}"
                  />
                  <button class="btn-remove" @click="${() => this._removeThreshold(index)}">Remove</button>
                </div>
              `)}
            </div>
          `)}

          <!-- ADVANCED OPTIONS -->
          ${this.renderSection('advanced', '⚙️ Advanced Options', 'Performance, caching, and advanced settings', html`
            <div class="form-row">
              <div class="form-group">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    .checked="${this._cache}"
                    @change="${ev => this._valueChanged(ev, 'cache')}"
                  />
                  Enable Caching
                </label>
              </div>

              <div class="form-group">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    .checked="${this._compress}"
                    @change="${ev => this._valueChanged(ev, 'compress')}"
                  />
                  Enable Compression
                </label>
              </div>
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  .checked="${this._group}"
                  @change="${ev => this._valueChanged(ev, 'group')}"
                />
                Group Mode (remove padding/shadow)
              </label>
            </div>

            <div class="tap-action-section">
              <h4>Tap Action</h4>
              <div class="form-row">
                <div class="form-group">
                  <label>Action Type:</label>
                  <select .value="${this._tap_action.action}" @change="${ev => this._tapActionChanged(ev, 'action')}">
                    <option value="more-info">More Info</option>
                    <option value="navigate">Navigate</option>
                    <option value="call-service">Call Service</option>
                    <option value="url">Open URL</option>
                    <option value="none">No Action</option>
                  </select>
                </div>

                ${this._tap_action.action === 'navigate' ? html`
                  <div class="form-group">
                    <label>Navigation Path:</label>
                    <input
                      type="text"
                      .value="${this._tap_action.navigation_path || ''}"
                      @input="${ev => this._tapActionChanged(ev, 'navigation_path')}"
                      placeholder="/lovelace/dashboard"
                    />
                  </div>
                ` : ''}

                ${this._tap_action.action === 'url' ? html`
                  <div class="form-group">
                    <label>URL:</label>
                    <input
                      type="text"
                      .value="${this._tap_action.url || ''}"
                      @input="${ev => this._tapActionChanged(ev, 'url')}"
                      placeholder="https://example.com"
                    />
                  </div>
                ` : ''}

                ${this._tap_action.action === 'call-service' ? html`
                  <div class="form-group">
                    <label>Service:</label>
                    <input
                      type="text"
                      .value="${this._tap_action.service || ''}"
                      @input="${ev => this._tapActionChanged(ev, 'service')}"
                      placeholder="light.toggle"
                    />
                  </div>
                ` : ''}
              </div>
            </div>
          `)}

          <!-- ENTITY CONFIGURATION -->
          ${this.renderSection('entities', '🔧 Entity Configuration', 'Individual entity settings and overrides', html`
            <div class="entities-info">
              Configure individual entity settings. These override global settings for specific entities.
            </div>

            ${this._entities.map((entity, index) => html`
              <div class="entity-config">
                <div class="entity-config-header">
                  <span class="entity-name">${typeof entity === 'string' ? entity : entity.entity}</span>
                  <button @click="${() => this._toggleEntityConfig(index)}">
                    ${this._isEntityConfigExpanded(index) ? 'Hide' : 'Configure'}
                  </button>
                </div>

                ${this._isEntityConfigExpanded(index) ? this.renderEntityConfig(entity, index) : ''}
              </div>
            `)}
          `)}
        </div>
      `;
    } catch (error) {
      console.error('🔧 Mini Graph Card Editor: Error in render():', error);
      return html`
        <div class="error">
          <h3>Editor Error</h3>
          <p>An error occurred while rendering the editor: ${error.message}</p>
          <pre>${error.stack}</pre>
        </div>
      `;
    }
  }

  renderSection(key, title, description, content) {
    console.log(`🔧 Editor: Rendering section ${key}`);
    const isExpanded = this._expandedSections[key];

    return html`
      <div class="section">
        <div class="section-header ${isExpanded ? 'expanded' : ''}" @click="${() => this._toggleSection(key)}">
          <div class="section-info">
            <div class="section-title">${title}</div>
            <div class="section-description">${description}</div>
          </div>
          <div class="section-toggle">${isExpanded ? '▼' : '▶'}</div>
        </div>
        ${isExpanded ? html`<div class="section-content">${content}</div>` : ''}
      </div>
    `;
  }

  renderEntityPicker(value, handler) {
    console.log('🔧 Editor: Rendering entity picker with value:', value);
    try {
      if (this.hass && customElements.get('ha-entity-picker')) {
        return html`
          <ha-entity-picker
            .hass="${this.hass}"
            .value="${value}"
            @value-changed="${handler}"
            allow-custom-entity
          ></ha-entity-picker>
        `;
      }
    } catch (error) {
      console.warn('🔧 Editor: ha-entity-picker not available, using fallback:', error);
    }

    // Fallback to simple input
    return html`
      <input
        type="text"
        .value="${value}"
        @input="${handler}"
        placeholder="sensor.temperature"
        list="entity-list"
      />
      <datalist id="entity-list">
        ${Object.keys((this.hass && this.hass.states) || {}).map(entity => html`
          <option value="${entity}"></option>
        `)}
      </datalist>
    `;
  }

  renderIconPicker(value, handler) {
    console.log('🔧 Editor: Rendering icon picker with value:', value);
    try {
      if (this.hass && customElements.get('ha-icon-picker')) {
        return html`
          <ha-icon-picker
            .hass="${this.hass}"
            .value="${value}"
            @value-changed="${handler}"
          ></ha-icon-picker>
        `;
      }
    } catch (error) {
      console.warn('🔧 Editor: ha-icon-picker not available, using fallback:', error);
    }

    // Fallback to simple input
    return html`
      <input
        type="text"
        .value="${value}"
        @input="${handler}"
        placeholder="mdi:thermometer"
      />
    `;
  }

  renderEntityConfig(entity, index) {
    const config = typeof entity === 'string' ? {} : entity;

    return html`
      <div class="entity-config-content">
        <div class="form-row">
          <div class="form-group">
            <label>Custom Name:</label>
            <input
              type="text"
              .value="${config.name || ''}"
              @input="${ev => this._entityConfigChanged(ev, index, 'name')}"
            />
          </div>

          <div class="form-group">
            <label>Custom Color:</label>
            <input
              type="color"
              .value="${config.color || '#ff0000'}"
              @input="${ev => this._entityConfigChanged(ev, index, 'color')}"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Attribute (instead of state):</label>
            <input
              type="text"
              .value="${config.attribute || ''}"
              @input="${ev => this._entityConfigChanged(ev, index, 'attribute')}"
              placeholder="temperature"
            />
          </div>

          <div class="form-group">
            <label>Y-Axis:</label>
            <select .value="${config.y_axis || 'primary'}" @change="${ev => this._entityConfigChanged(ev, index, 'y_axis')}">
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </select>
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
            <label class="checkbox-item">
              <input
                type="checkbox"
                .checked="${config[option.key] !== false}"
                @change="${ev => this._entityConfigChanged(ev, index, option.key)}"
              />
              ${option.label}
            </label>
          `)}
        </div>
      </div>
    `;
  }

  // Event handlers with logging
  _toggleSection(key) {
    console.log(`🔧 Editor: Toggling section ${key}`);
    this._expandedSections = {
      ...this._expandedSections,
      [key]: !this._expandedSections[key],
    };
    this.requestUpdate();
  }

  _primaryEntityChanged(ev) {
    console.log('🔧 Editor: Primary entity changed:', ev);
    const value = (ev.detail && ev.detail.value) || (ev.target && ev.target.value);
    console.log('🔧 Editor: New entity value:', value);

    if (value && !this._entities.length) {
      this._config = { ...this._config, entities: [value] };
      delete this._config.entity;
      console.log('🔧 Editor: Updated config:', this._config);
      fireEvent(this, 'config-changed', { config: this._config });
    }
  }

  _addEntity() {
    console.log('🔧 Editor: Adding new entity');
    const entities = [...this._entities, ''];
    this._config = { ...this._config, entities };
    console.log('🔧 Editor: New entities list:', entities);
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _removeEntity(index) {
    console.log('🔧 Editor: Removing entity at index:', index);
    const entities = [...this._entities];
    entities.splice(index, 1);
    this._config = { ...this._config, entities };
    console.log('🔧 Editor: Entities after removal:', entities);
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _entityListChanged(ev, index) {
    console.log('🔧 Editor: Entity list changed at index:', index, ev);
    const value = (ev.detail && ev.detail.value) || (ev.target && ev.target.value);
    console.log('🔧 Editor: New entity value:', value);

    if (!value) return;

    const entities = [...this._entities];
    entities[index] = value;
    this._config = { ...this._config, entities };
    console.log('🔧 Editor: Updated entities list:', entities);
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _valueChanged(ev, key) {
    console.log('🔧 Editor: Value changed for key:', key, ev);
    if (!this._config || !this.hass) {
      console.warn('🔧 Editor: No config or hass available');
      return;
    }

    let value;
    if (ev.target.type === 'checkbox') {
      value = ev.target.checked;
    } else if (ev.target.type === 'number') {
      value = Number(ev.target.value) || 0;
    } else if (ev.detail && ev.detail.value !== undefined) {
      value = ev.detail.value;
    } else {
      value = ev.target.value;
    }

    console.log('🔧 Editor: Setting', key, '=', value);

    // Handle special cases
    if (key === 'line_color' && typeof value === 'string' && value.includes(',')) {
      value = value.split(',').map(c => c.trim());
    }

    this._config = { ...this._config, [key]: value };
    console.log('🔧 Editor: Updated config:', this._config);
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _showChanged(ev, key) {
    console.log('🔧 Editor: Show option changed for key:', key, ev.target.checked);
    if (!this._config || !this.hass) return;

    const value = ev.target.checked;
    this._config = {
      ...this._config,
      show: { ...this._show, [key]: value },
    };

    console.log('🔧 Editor: Updated show config:', this._config.show);
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _addThreshold() {
    console.log('🔧 Editor: Adding new threshold');
    const thresholds = [...this._color_thresholds, { value: 0, color: '#ff0000' }];
    this._config = { ...this._config, color_thresholds: thresholds };
    console.log('🔧 Editor: New thresholds:', thresholds);
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _removeThreshold(index) {
    console.log('🔧 Editor: Removing threshold at index:', index);
    const thresholds = [...this._color_thresholds];
    thresholds.splice(index, 1);
    this._config = { ...this._config, color_thresholds: thresholds };
    console.log('🔧 Editor: Thresholds after removal:', thresholds);
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _thresholdChanged(ev, index, field) {
    console.log('🔧 Editor: Threshold changed at index:', index, 'field:', field, 'value:', ev.target.value);
    const thresholds = [...this._color_thresholds];
    let { value } = ev.target;

    if (field === 'value') {
      value = Number(value);
    }

    thresholds[index] = { ...thresholds[index], [field]: value };
    this._config = { ...this._config, color_thresholds: thresholds };
    console.log('🔧 Editor: Updated thresholds:', thresholds);
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _tapActionChanged(ev, field) {
    console.log('🔧 Editor: Tap action changed field:', field, 'value:', ev.target.value);
    const { value } = ev.target;

    const tapAction = { ...this._tap_action, [field]: value };
    this._config = { ...this._config, tap_action: tapAction };
    console.log('🔧 Editor: Updated tap action:', tapAction);
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _toggleEntityConfig(index) {
    console.log('🔧 Editor: Toggling entity config for index:', index);
    this._expandedEntities = this._expandedEntities || [];
    const isExpanded = this._expandedEntities.includes(index);

    if (isExpanded) {
      this._expandedEntities = this._expandedEntities.filter(i => i !== index);
    } else {
      this._expandedEntities = [...this._expandedEntities, index];
    }

    console.log('🔧 Editor: Expanded entities:', this._expandedEntities);
    this.requestUpdate();
  }

  _isEntityConfigExpanded(index) {
    return this._expandedEntities && this._expandedEntities.includes(index);
  }

  _entityConfigChanged(ev, index, field) {
    console.log('🔧 Editor: Entity config changed at index:', index, 'field:', field, 'value:', ev.target.value);
    const entities = [...this._entities];
    const entityConfig = typeof entities[index] === 'string'
      ? { entity: entities[index] }
      : { ...entities[index] };

    let { value } = ev.target;

    if (ev.target.type === 'checkbox') {
      value = ev.target.checked;
    }

    entityConfig[field] = value;
    entities[index] = entityConfig;

    this._config = { ...this._config, entities };
    console.log('🔧 Editor: Updated entity config:', entityConfig);
    fireEvent(this, 'config-changed', { config: this._config });
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: var(--paper-font-body1_-_font-family);
      }

      .loading, .error {
        text-align: center;
        padding: 40px 20px;
        color: var(--primary-text-color);
      }

      .error {
        color: var(--error-color);
      }

      .error pre {
        text-align: left;
        background: var(--secondary-background-color);
        padding: 10px;
        border-radius: 4px;
        overflow: auto;
        font-size: 12px;
      }

      .card-config {
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
      }

      .header {
        text-align: center;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--divider-color);
      }

      .header h2 {
        color: var(--primary-text-color);
        margin: 0 0 10px 0;
        font-size: 1.5em;
      }

      .header p {
        color: var(--secondary-text-color);
        margin: 0;
      }

      .debug-info {
        margin-top: 10px;
        opacity: 0.7;
      }

      .section {
        margin-bottom: 20px;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        background: var(--card-background-color);
        overflow: hidden;
      }

      .section-header {
        display: flex;
        align-items: center;
        padding: 16px 20px;
        cursor: pointer;
        background: var(--primary-color);
        color: var(--text-primary-color);
        transition: background-color 0.2s ease;
      }

      .section-header:hover {
        opacity: 0.9;
      }

      .section-header.expanded {
        border-bottom: 1px solid var(--divider-color);
      }

      .section-info {
        flex: 1;
      }

      .section-title {
        font-weight: 500;
        font-size: 1.1em;
        margin-bottom: 2px;
      }

      .section-description {
        font-size: 0.9em;
        opacity: 0.8;
      }

      .section-toggle {
        font-size: 1.2em;
        font-weight: bold;
      }

      .section-content {
        padding: 20px;
      }

      .form-group {
        margin-bottom: 16px;
      }

      .form-group label {
        display: block;
        margin-bottom: 6px;
        font-weight: 500;
        color: var(--primary-text-color);
        font-size: 0.9em;
      }

      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }

      input[type="text"],
      input[type="number"],
      input[type="color"],
      select {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
      }

      input[type="color"] {
        padding: 4px;
        height: 40px;
        cursor: pointer;
      }

      button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s ease;
      }

      .btn-add {
        background: var(--primary-color);
        color: var(--text-primary-color);
      }

      .btn-remove {
        background: var(--error-color);
        color: white;
      }

      .btn-add:hover,
      .btn-remove:hover {
        opacity: 0.9;
        transform: translateY(-1px);
      }

      .checkbox-label {
        display: flex !important;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }

      .checkbox-label input[type="checkbox"] {
        width: auto;
      }

      .show-options,
      .thresholds-section,
      .tap-action-section {
        margin-top: 24px;
        padding-top: 20px;
        border-top: 1px solid var(--divider-color);
      }

      .show-options h4,
      .thresholds-section h4,
      .tap-action-section h4 {
        margin: 0 0 16px 0;
        color: var(--primary-text-color);
        font-size: 1em;
      }

      .checkbox-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 12px;
      }

      .checkbox-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        background: var(--secondary-background-color);
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s ease;
      }

      .checkbox-item:hover {
        background: var(--divider-color);
      }

      .checkbox-item input[type="checkbox"] {
        margin: 0;
        width: auto;
      }

      .entity-row,
      .threshold-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
        padding: 12px;
        background: var(--secondary-background-color);
        border-radius: 4px;
      }

      .entity-row > *:first-child,
      .threshold-row > *:first-child {
        flex: 1;
      }

      .thresholds-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      .entities-info {
        color: var(--secondary-text-color);
        font-size: 0.9em;
        margin-bottom: 20px;
        padding: 16px;
        background: var(--secondary-background-color);
        border-radius: 4px;
        border-left: 4px solid var(--primary-color);
      }

      .entity-config {
        margin-bottom: 16px;
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        overflow: hidden;
      }

      .entity-config-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: var(--secondary-background-color);
        border-bottom: 1px solid var(--divider-color);
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
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 8px;
        margin-top: 16px;
      }

      ha-entity-picker,
      ha-icon-picker {
        width: 100%;
      }

      @media (max-width: 600px) {
        .card-config {
          padding: 16px;
        }

        .form-row {
          grid-template-columns: 1fr;
        }

        .checkbox-grid {
          grid-template-columns: 1fr;
        }

        .entity-switches {
          grid-template-columns: 1fr;
        }

        .entity-row,
        .threshold-row {
          flex-direction: column;
          align-items: stretch;
        }

        .entity-row > *,
        .threshold-row > * {
          flex: none;
        }
      }
    `;
  }
}

console.log('🔧 Mini Graph Card Editor: Defining custom element...');
customElements.define('mini-graph-card-editor', MiniGraphCardEditor);
console.log('🔧 Mini Graph Card Editor: Custom element defined successfully!');
