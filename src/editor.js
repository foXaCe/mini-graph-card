import { LitElement, html, css } from 'lit-element';
import { fireEvent } from 'custom-card-helpers';
import { localize } from './localize';

// Editor-scoped translation helper. The active hass is captured at render
// time (see render()) so every t('...') call resolves to the user's
// Home Assistant language via the shared localize module.
let editorHass = null;
const t = key => localize(key, editorHass);

export default class MiniGraphCardEditor extends LitElement {
  static get properties() {
    return {
      hass: Object,
      _config: Object,
      _expandedSections: Object,
      _expandedEntities: Array,
    };
  }

  constructor() {
    super();
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
    this._expandedEntities = [];
  }

  setConfig(config) {
    this._config = { ...config };

    // Ensure entities array exists and normalize string entities
    if (this._config.entities) {
      this._config.entities = this._config.entities.map((entity) => {
        if (typeof entity === 'string') {
          return { entity };
        }
        return { ...entity };
      });
    }

    // Force re-render by updating a reactive property
    this.requestUpdate();
  }

  // Configuration getters
  get _entity() {
    const val = (this._config && this._config.entity) || '';
    return val;
  }

  get _entities() {
    const val = (this._config && this._config.entities) || [];
    return val;
  }

  get _name() {
    const val = (this._config && this._config.name) || '';
    return val;
  }

  get _icon() {
    const val = (this._config && this._config.icon) || '';
    return val;
  }

  get _icon_image() {
    const val = (this._config && this._config.icon_image) || '';
    return val;
  }

  get _unit() {
    const val = (this._config && this._config.unit) || '';
    return val;
  }

  get _height() {
    const val = (this._config && this._config.height) || 100;
    return val;
  }

  get _line_width() {
    const val = (this._config && this._config.line_width) || 5;
    return val;
  }

  get _line_color() {
    const val = Array.isArray(this._config && this._config.line_color)
      ? this._config.line_color.join(', ')
      : ((this._config && this._config.line_color) || '');
    return val;
  }

  get _bar_spacing() {
    const val = (this._config && this._config.bar_spacing) || 4;
    return val;
  }

  get _animate() {
    const val = this._config ? (this._config.animate !== false) : true;
    return val;
  }

  get _hours_to_show() {
    const val = (this._config && this._config.hours_to_show) || 24;
    return val;
  }

  get _points_per_hour() {
    const val = (this._config && this._config.points_per_hour) || 0.5;
    return val;
  }

  get _aggregate_func() {
    const val = (this._config && this._config.aggregate_func) || 'avg';
    return val;
  }

  get _group_by() {
    const val = (this._config && this._config.group_by) || 'interval';
    return val;
  }

  get _update_interval() {
    const val = (this._config && this._config.update_interval) || '';
    return val;
  }

  get _hour24() {
    const val = (this._config && this._config.hour24) || false;
    return val;
  }

  get _lower_bound() {
    const val = (this._config && this._config.lower_bound !== undefined) ? this._config.lower_bound : '';
    return val;
  }

  get _upper_bound() {
    const val = (this._config && this._config.upper_bound !== undefined) ? this._config.upper_bound : '';
    return val;
  }

  get _min_bound_range() {
    const val = (this._config && this._config.min_bound_range) || '';
    return val;
  }

  get _smoothing() {
    const val = this._config ? (this._config.smoothing !== false) : true;
    return val;
  }

  get _logarithmic() {
    const val = (this._config && this._config.logarithmic) || false;
    return val;
  }

  get _color_thresholds() {
    const val = (this._config && this._config.color_thresholds) || [];
    return val;
  }

  get _color_thresholds_transition() {
    const val = (this._config && this._config.color_thresholds_transition) || 'smooth';
    return val;
  }

  get _font_size() {
    const val = (this._config && this._config.font_size) || 100;
    return val;
  }

  get _font_size_header() {
    const val = (this._config && this._config.font_size_header) || 14;
    return val;
  }

  get _align_header() {
    const val = (this._config && this._config.align_header) || 'default';
    return val;
  }

  get _align_icon() {
    const val = (this._config && this._config.align_icon) || 'right';
    return val;
  }

  get _align_state() {
    const val = (this._config && this._config.align_state) || 'left';
    return val;
  }

  get _decimals() {
    const val = (this._config && this._config.decimals !== undefined) ? this._config.decimals : '';
    return val;
  }

  get _cache() {
    const val = this._config ? (this._config.cache !== false) : true;
    return val;
  }

  get _compress() {
    const val = this._config ? (this._config.compress !== false) : true;
    return val;
  }

  get _group() {
    const val = (this._config && this._config.group) || false;
    return val;
  }

  get _show() {
    const val = (this._config && this._config.show) || {};
    return val;
  }

  get _tap_action() {
    const val = (this._config && this._config.tap_action) || { action: 'more-info' };
    return val;
  }

  render() {
    editorHass = this.hass;
    if (!this.hass) {
      return html`
        <div class="loading">
          <h3>${t('editor.messages.loading_home_assistant')}</h3>
          <p>${t('editor.messages.please_wait_while_the_editor_loads')}</p>
        </div>
      `;
    }

    try {
      return html`
        <div class="card-config">
          <div class="header">
            <h2>${t('editor.headers.mini_graph_card_configuration')}</h2>
            <p>${t('editor.headers.complete_configuration_for_all_options')}</p>
          </div>

          <!-- ENTITIES MANAGEMENT -->
          ${this.renderSection('entities', `🏠 ${t('editor.sections.entities')}`, t('editor.sections.add_configure_and_manage_all_your_entities'), html`
            ${this._entities.length === 0 ? html`
              <div class="form-group">
                <label>${t('editor.labels.primary_entity_will_be_converted_to_entities_list')}:</label>
                ${this.renderEntityPicker(this._entity, ev => this._primaryEntityChanged(ev))}
              </div>
            ` : ''}

            <div class="entities-section">
              ${this._entities.map((entity, index) => html`
                <div class="entity-management-row">
                  <div class="entity-top-section">
                    <div class="entity-picker-section">
                      ${this.renderEntityPicker(
    typeof entity === 'string' ? entity : entity.entity,
    ev => this._entityListChanged(ev, index),
  )}
                    </div>
                    <div class="entity-info-section">
                      ${(() => {
    const entityId = typeof entity === 'string' ? entity : entity.entity;
    const entityInfo = this.getEntityInfo(entityId);
    return html`
                          <div class="entity-display">
                            <ha-icon .icon="${entityInfo.icon}" class="entity-icon"></ha-icon>
                            <div class="entity-details">
                              <div class="entity-friendly-name">${entityInfo.friendlyName}</div>
                              <div class="entity-id">${entityInfo.entityId}</div>
                            </div>
                          </div>
                        `;
  })()}
                    </div>
                  </div>
                  <div class="entity-actions">
                    <button class="btn-configure" @click="${() => this._toggleEntityConfig(index)}">
                      ${this._isEntityConfigExpanded(index) ? t('editor.buttons.hide') : t('editor.buttons.configure')}
                    </button>
                    <button class="btn-remove" @click="${() => this._removeEntity(index)}" title="${t('editor.buttons.remove_entity')}">×</button>
                  </div>
                </div>
                ${this._isEntityConfigExpanded(index) ? html`
                  <div class="entity-config-expanded">
                    ${this.renderEntityConfig(entity, index)}
                  </div>
                ` : ''}
              `)}
              <button class="btn-add" @click="${this._addEntity}">${t('editor.buttons.add_entity')}</button>
            </div>
          `)}

          <!-- DISPLAY OPTIONS -->
          ${this.renderSection('display', `🎨 ${t('editor.sections.display_options')}`, t('editor.sections.name_icon_and_visual_appearance_settings'), html`
            <div class="form-row">
              <div class="form-group">
                <label>${t('editor.labels.card_name')}:</label>
                <input
                  type="text"
                  .value="${this._name}"
                  @input="${ev => this._valueChanged(ev, 'name')}"
                  placeholder="${t('editor.placeholders.card_title')}"
                />
              </div>

              <div class="form-group">
                <label>${t('editor.labels.icon')}:</label>
                ${this.renderIconPicker(this._icon, ev => this._valueChanged(ev, 'icon'))}
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>${t('editor.labels.icon_image_url')}:</label>
                <input
                  type="text"
                  .value="${this._icon_image}"
                  @input="${ev => this._valueChanged(ev, 'icon_image')}"
                  placeholder="https://example.com/image.png"
                />
              </div>

              <div class="form-group">
                <label>${t('editor.labels.unit')}:</label>
                <input
                  type="text"
                  .value="${this._unit}"
                  @input="${ev => this._valueChanged(ev, 'unit')}"
                  placeholder="${t('editor.placeholders.unit_example')}"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>${t('editor.labels.font_size')}:</label>
                <input
                  type="number"
                  min="50"
                  max="200"
                  .value="${this._font_size}"
                  @input="${ev => this._valueChanged(ev, 'font_size')}"
                />
              </div>

              <div class="form-group">
                <label>${t('editor.labels.header_font_size_px')}:</label>
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
                <label>${t('editor.labels.header_alignment')}:</label>
                <select .value="${this._align_header}" @change="${ev => this._valueChanged(ev, 'align_header')}">
                  <option value="default">${t('editor.options.default')}</option>
                  <option value="left">${t('editor.options.left')}</option>
                  <option value="right">${t('editor.options.right')}</option>
                  <option value="center">${t('editor.options.center')}</option>
                </select>
              </div>

              <div class="form-group">
                <label>${t('editor.labels.icon_alignment')}:</label>
                <select .value="${this._align_icon}" @change="${ev => this._valueChanged(ev, 'align_icon')}">
                  <option value="left">${t('editor.options.left')}</option>
                  <option value="right">${t('editor.options.right')}</option>
                  <option value="center">${t('editor.options.center')}</option>
                  <option value="state">${t('editor.options.with_state')}</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>${t('editor.labels.state_alignment')}:</label>
                <select .value="${this._align_state}" @change="${ev => this._valueChanged(ev, 'align_state')}">
                  <option value="left">${t('editor.options.left')}</option>
                  <option value="right">${t('editor.options.right')}</option>
                  <option value="center">${t('editor.options.center')}</option>
                </select>
              </div>

              <div class="form-group">
                <label>${t('editor.labels.decimal_places')}:</label>
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
              <h4>${t('editor.visibility.visibility_options')}</h4>
              <div class="checkbox-grid">
                ${[
    { key: 'name', label: t('editor.visibility.name') },
    { key: 'icon', label: t('editor.labels.icon') },
    { key: 'state', label: t('editor.visibility.state') },
    { key: 'graph', label: t('editor.visibility.graph') },
    { key: 'fill', label: t('editor.visibility.fill') },
    { key: 'points', label: t('editor.visibility.points') },
    { key: 'legend', label: t('editor.visibility.legend') },
    { key: 'extrema', label: t('editor.visibility.extrema') },
    { key: 'average', label: t('editor.visibility.average') },
    { key: 'labels', label: t('editor.visibility.labels') },
    { key: 'labels_secondary', label: t('editor.visibility.secondary_labels') },
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
          ${this.renderSection('graph', `📊 ${t('editor.sections.graph_settings')}`, t('editor.sections.graph_type_colors_and_visual_properties'), html`
            <div class="form-row">
              <div class="form-group">
                <label>${t('editor.labels.height_px')}:</label>
                <input
                  type="number"
                  min="50"
                  max="500"
                  .value="${this._height}"
                  @input="${ev => this._valueChanged(ev, 'height')}"
                />
              </div>

              <div class="form-group">
                <label>${t('editor.labels.line_width')}:</label>
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
                <label>${t('editor.labels.line_colors_comma_separated')}:</label>
                <input
                  type="text"
                  .value="${this._line_color}"
                  @input="${ev => this._valueChanged(ev, 'line_color')}"
                  placeholder="#ff0000, #00ff00, #0000ff"
                />
              </div>

              <div class="form-group">
                <label>${t('editor.labels.bar_spacing')}:</label>
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
                  ${t('editor.labels.enable_animation')}
                </label>
              </div>

              <div class="form-group">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    .checked="${this._smoothing}"
                    @change="${ev => this._valueChanged(ev, 'smoothing')}"
                  />
                  ${t('editor.labels.smooth_lines')}
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
                  ${t('editor.labels.logarithmic_scale')}
                </label>
              </div>
            </div>
          `)}

          <!-- DATA & TIME -->
          ${this.renderSection('data', `⏱️ ${t('editor.sections.data_time')}`, t('editor.sections.data_aggregation_and_time_configuration'), html`
            <div class="form-row">
              <div class="form-group">
                <label>${t('editor.labels.hours_to_show')}:</label>
                <input
                  type="number"
                  min="1"
                  max="168"
                  .value="${this._hours_to_show}"
                  @input="${ev => this._valueChanged(ev, 'hours_to_show')}"
                />
              </div>

              <div class="form-group">
                <label>${t('editor.labels.points_per_hour')}:</label>
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
                <label>${t('editor.labels.aggregate_function')}:</label>
                <select .value="${this._aggregate_func}" @change="${ev => this._valueChanged(ev, 'aggregate_func')}">
                  <option value="avg">${t('editor.options.average')}</option>
                  <option value="median">${t('editor.options.median')}</option>
                  <option value="min">${t('editor.options.minimum')}</option>
                  <option value="max">${t('editor.options.maximum')}</option>
                  <option value="first">${t('editor.options.first')}</option>
                  <option value="last">${t('editor.options.last')}</option>
                  <option value="sum">${t('editor.options.sum')}</option>
                  <option value="delta">${t('editor.options.delta')}</option>
                  <option value="diff">${t('editor.options.difference')}</option>
                </select>
              </div>

              <div class="form-group">
                <label>${t('editor.labels.group_by')}:</label>
                <select .value="${this._group_by}" @change="${ev => this._valueChanged(ev, 'group_by')}">
                  <option value="interval">${t('editor.options.interval')}</option>
                  <option value="date">${t('editor.options.date')}</option>
                  <option value="hour">${t('editor.options.hour')}</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>${t('editor.labels.update_interval_seconds')}:</label>
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
                  ${t('editor.labels.time_format_24h')}
                </label>
              </div>
            </div>
          `)}

          <!-- SCALE & BOUNDS -->
          ${this.renderSection('bounds', `📏 ${t('editor.sections.scale_bounds')}`, t('editor.sections.y_axis_bounds_and_scaling_options'), html`
            <h4>${t('editor.labels.primary_y_axis')}</h4>
            <div class="form-row">
              <div class="form-group">
                <label>${t('editor.labels.lower_bound_use_n_for_soft')}:</label>
                <input
                  type="text"
                  .value="${this._lower_bound}"
                  @input="${ev => this._valueChanged(ev, 'lower_bound')}"
                  placeholder="${t('editor.placeholders.lower_bound_example')}"
                />
              </div>

              <div class="form-group">
                <label>${t('editor.labels.upper_bound_use_n_for_soft')}:</label>
                <input
                  type="text"
                  .value="${this._upper_bound}"
                  @input="${ev => this._valueChanged(ev, 'upper_bound')}"
                  placeholder="${t('editor.placeholders.upper_bound_example')}"
                />
              </div>
            </div>

            <div class="form-group">
              <label>${t('editor.labels.minimum_range')}:</label>
              <input
                type="number"
                min="0"
                .value="${this._min_bound_range}"
                @input="${ev => this._valueChanged(ev, 'min_bound_range')}"
              />
            </div>
          `)}

          <!-- COLORS & THRESHOLDS -->
          ${this.renderSection('colors', `🎨 ${t('editor.sections.colors_thresholds')}`, t('editor.sections.color_configuration_and_dynamic_thresholds'), html`
            <div class="form-group">
              <label>${t('editor.labels.threshold_transition')}:</label>
              <select .value="${this._color_thresholds_transition}" @change="${ev => this._valueChanged(ev, 'color_thresholds_transition')}">
                <option value="smooth">${t('editor.options.smooth')}</option>
                <option value="hard">${t('editor.options.hard')}</option>
              </select>
            </div>

            <div class="thresholds-section">
              <div class="thresholds-header">
                <h4>${t('editor.labels.color_thresholds')}</h4>
                <button class="btn-add" @click="${this._addThreshold}">${t('editor.buttons.add_threshold')}</button>
              </div>

              ${this._color_thresholds.map((threshold, index) => html`
                <div class="threshold-row">
                  <input
                    type="number"
                    .value="${threshold.value}"
                    @input="${ev => this._thresholdChanged(ev, index, 'value')}"
                    placeholder="${t('editor.placeholders.value')}"
                  />
                  <input
                    type="color"
                    .value="${threshold.color}"
                    @input="${ev => this._thresholdChanged(ev, index, 'color')}"
                  />
                  <button class="btn-remove" @click="${() => this._removeThreshold(index)}">${t('editor.buttons.remove')}</button>
                </div>
              `)}
            </div>
          `)}

          <!-- ADVANCED OPTIONS -->
          ${this.renderSection('advanced', `⚙️ ${t('editor.sections.advanced_options')}`, t('editor.sections.advanced_options_and_performance_settings'), html`
            <div class="form-row">
              <div class="form-group">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    .checked="${this._cache}"
                    @change="${ev => this._valueChanged(ev, 'cache')}"
                  />
                  ${t('editor.labels.cache_data')}
                </label>
              </div>

              <div class="form-group">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    .checked="${this._compress}"
                    @change="${ev => this._valueChanged(ev, 'compress')}"
                  />
                  ${t('editor.labels.compress_data')}
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
                ${t('editor.labels.group_entities')}
              </label>
            </div>

            <div class="tap-action-section">
              <h4>${t('editor.tap_action.tap_action')}</h4>
              <div class="form-row">
                <div class="form-group">
                  <label>${t('editor.tap_action.action_type')}:</label>
                  <select .value="${this._tap_action.action}" @change="${ev => this._tapActionChanged(ev, 'action')}">
                    <option value="more-info">${t('editor.tap_action.more_info')}</option>
                    <option value="navigate">${t('editor.tap_action.navigate')}</option>
                    <option value="call-service">${t('editor.tap_action.call_service')}</option>
                    <option value="url">${t('editor.tap_action.open_url')}</option>
                    <option value="none">${t('editor.tap_action.no_action')}</option>
                  </select>
                </div>

                ${this._tap_action.action === 'navigate' ? html`
                  <div class="form-group">
                    <label>${t('editor.tap_action.navigation_path')}:</label>
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
                    <label>${t('editor.tap_action.url')}:</label>
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
                    <label>${t('editor.tap_action.service')}:</label>
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

        </div>
      `;
    } catch (error) {
      return html`
        <div class="error">
          <h3>${t('editor.messages.editor_error')}</h3>
          <p>${t('editor.messages.an_error_occurred_while_rendering_the_editor')}: ${error.message}</p>
          <pre>${error.stack}</pre>
        </div>
      `;
    }
  }

  renderSection(key, title, description, content) {
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
      // Fallback silently to simple input
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
      // Fallback silently to simple input
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
            <label>${t('editor.entity.custom_name')}:</label>
            <input
              type="text"
              .value="${config.name || ''}"
              @input="${ev => this._entityConfigChanged(ev, index, 'name')}"
            />
          </div>

          <div class="form-group">
            <label>${t('editor.entity.custom_color')}:</label>
            <input
              type="color"
              .value="${config.color || '#ff0000'}"
              @input="${ev => this._entityConfigChanged(ev, index, 'color')}"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${t('editor.entity.attribute_instead_of_state')}:</label>
            <input
              type="text"
              .value="${config.attribute || ''}"
              @input="${ev => this._entityConfigChanged(ev, index, 'attribute')}"
              placeholder="temperature"
            />
          </div>

          <div class="form-group">
            <label>${t('editor.entity.y_axis')}:</label>
            <select .value="${config.y_axis || 'primary'}" @change="${ev => this._entityConfigChanged(ev, index, 'y_axis')}">
              <option value="primary">${t('editor.options.primary')}</option>
              <option value="secondary">${t('editor.options.secondary')}</option>
            </select>
          </div>
        </div>

        <div class="entity-switches">
          ${[
    { key: 'show_state', label: 'editor.entity.show_state' },
    { key: 'show_graph', label: 'editor.entity.show_in_graph' },
    { key: 'show_line', label: 'editor.entity.show_line' },
    { key: 'show_fill', label: 'editor.entity.show_fill' },
    { key: 'show_points', label: 'editor.entity.show_points' },
    { key: 'show_legend', label: 'editor.entity.show_in_legend' },
    { key: 'smoothing', label: 'editor.entity.smoothing' },
    { key: 'fixed_value', label: 'editor.entity.fixed_value' },
  ].map(option => html`
            <label class="checkbox-item">
              <input
                type="checkbox"
                .checked="${config[option.key] !== false}"
                @change="${ev => this._entityConfigChanged(ev, index, option.key)}"
              />
              ${t(option.label)}
            </label>
          `)}
        </div>
      </div>
    `;
  }

  // Helper methods
  getEntityInfo(entityId) {
    if (!this.hass || !this.hass.states) {
      return {
        entityId,
        friendlyName: entityId,
        icon: 'mdi:help-circle',
        domain: entityId.split('.')[0] || 'unknown',
      };
    }

    const entityState = this.hass.states[entityId];
    if (!entityState) {
      return {
        entityId,
        friendlyName: entityId,
        icon: 'mdi:help-circle-outline',
        domain: entityId.split('.')[0] || 'unknown',
      };
    }

    return {
      entityId,
      friendlyName: entityState.attributes.friendly_name || entityId,
      icon: entityState.attributes.icon || this.getDefaultIcon(entityId),
      domain: entityId.split('.')[0] || 'unknown',
      state: entityState.state,
    };
  }

  getDefaultIcon(entityId) {
    const domain = entityId.split('.')[0];
    const iconMap = {
      sensor: 'mdi:gauge',
      binary_sensor: 'mdi:radiobox-blank',
      switch: 'mdi:toggle-switch',
      light: 'mdi:lightbulb',
      climate: 'mdi:thermostat',
      cover: 'mdi:window-shutter',
      fan: 'mdi:fan',
      lock: 'mdi:lock',
      camera: 'mdi:camera',
      media_player: 'mdi:cast',
      device_tracker: 'mdi:account',
      sun: 'mdi:white-balance-sunny',
      weather: 'mdi:weather-partly-cloudy',
    };
    return iconMap[domain] || 'mdi:help-circle';
  }

  // Event handlers
  _toggleSection(key) {
    this._expandedSections = {
      ...this._expandedSections,
      [key]: !this._expandedSections[key],
    };
    this.requestUpdate();
  }

  _primaryEntityChanged(ev) {
    const value = (ev.detail && ev.detail.value) || (ev.target && ev.target.value);

    if (value && !this._entities.length) {
      this._config = { ...this._config, entities: [value] };
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
    const value = (ev.detail && ev.detail.value) || (ev.target && ev.target.value);

    if (!value) return;

    const entities = [...this._entities];
    entities[index] = value;
    this._config = { ...this._config, entities };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _valueChanged(ev, key) {
    if (!this._config || !this.hass) {
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


    // Handle special cases
    if (key === 'line_color' && typeof value === 'string' && value.includes(',')) {
      value = value.split(',').map(c => c.trim());
    }

    this._config = { ...this._config, [key]: value };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _showChanged(ev, key) {
    if (!this._config || !this.hass) return;

    const value = ev.target.checked;
    this._config = {
      ...this._config,
      show: { ...this._show, [key]: value },
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
    const { value } = ev.target;

    const tapAction = { ...this._tap_action, [field]: value };
    this._config = { ...this._config, tap_action: tapAction };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _toggleEntityConfig(index) {
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

    let { value } = ev.target;

    if (ev.target.type === 'checkbox') {
      value = ev.target.checked;
    }

    entityConfig[field] = value;
    entities[index] = entityConfig;

    this._config = { ...this._config, entities };
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
        min-width: 0; /* Prevents overflow in grid */
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
        gap: 20px;
        margin-bottom: 16px;
      }

      input[type="text"],
      input[type="number"],
      input[type="color"],
      select {
        width: 100%;
        padding: 10px 14px;
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
        box-sizing: border-box;
        transition: border-color 0.2s ease;
      }

      input[type="text"]:focus,
      input[type="number"]:focus,
      select:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 2px rgba(var(--accent-color-rgb, 3, 169, 244), 0.1);
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
        gap: 16px;
        margin-bottom: 12px;
        padding: 14px;
        background: var(--secondary-background-color);
        border-radius: 6px;
        border: 1px solid var(--divider-color);
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

      .entity-config-header button {
        flex-shrink: 0;
        min-width: 80px;
      }

      .entity-info {
        display: flex;
        align-items: center;
        flex: 1;
        min-width: 0;
        margin-right: 16px;
      }

      .entity-icon {
        color: var(--state-icon-color, var(--state-icon-unavailable-color, #bdbdbd));
        width: 24px;
        height: 24px;
        margin-right: 12px;
        flex-shrink: 0;
      }

      .entity-details {
        flex: 1;
        min-width: 0;
        overflow: hidden;
      }

      .entity-friendly-name {
        font-weight: 500;
        color: var(--primary-text-color);
        font-size: 0.95em;
        word-wrap: break-word;
        line-height: 1.3;
      }

      .entity-id {
        color: var(--secondary-text-color);
        font-size: 0.8em;
        word-wrap: break-word;
        margin-top: 2px;
        line-height: 1.2;
      }

      .entities-section {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .entity-management-row {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        background: var(--card-background-color);
      }

      .entity-top-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        align-items: center;
      }

      .entity-picker-section {
        min-width: 0;
      }

      .entity-info-section {
        min-width: 0;
      }

      .entity-display {
        display: flex;
        align-items: center;
        min-width: 0;
      }

      .entity-display .entity-icon {
        margin-right: 12px;
        flex-shrink: 0;
      }

      .entity-display .entity-details {
        flex: 1;
        min-width: 0;
      }

      .entity-actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
        flex-wrap: wrap;
      }

      .btn-configure {
        background: var(--primary-color);
        color: var(--text-primary-color);
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        min-width: 80px;
      }

      .btn-configure:hover {
        opacity: 0.9;
      }

      .btn-remove {
        background: var(--error-color);
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .btn-remove:hover {
        opacity: 0.9;
        transform: translateY(-1px);
      }

      .entity-config-expanded {
        margin-top: 12px;
        padding: 16px;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        background: var(--secondary-background-color);
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

      @media (max-width: 768px) {
        .form-row {
          gap: 16px;
        }
      }

      @media (max-width: 600px) {
        .card-config {
          padding: 16px;
        }

        .form-row {
          grid-template-columns: 1fr;
          gap: 12px;
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

customElements.define('mini-graph-card-editor', MiniGraphCardEditor);
