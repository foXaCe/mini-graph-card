import { LitElement, html } from 'lit-element';
import { fireEvent } from 'custom-card-helpers';
import { localize } from '../localize';
import editorStyles from './styles';
import { getEntityInfo } from './helpers';

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

  // Config getters needing more than a plain `value || default`: booleans that
  // must respect an explicit `false`, bounds that must respect an explicit `0`,
  // and line_color which renders an array as a comma list. The remaining simple
  // getters are generated in bulk at the bottom of this file (SIMPLE_GETTERS).
  get _line_color() {
    return Array.isArray(this._config && this._config.line_color)
      ? this._config.line_color.join(', ')
      : ((this._config && this._config.line_color) || '');
  }

  get _animate() {
    return this._config ? (this._config.animate !== false) : true;
  }

  get _smoothing() {
    return this._config ? (this._config.smoothing !== false) : true;
  }

  get _cache() {
    return this._config ? (this._config.cache !== false) : true;
  }

  get _compress() {
    return this._config ? (this._config.compress !== false) : true;
  }

  get _lower_bound() {
    return (this._config && this._config.lower_bound !== undefined) ? this._config.lower_bound : '';
  }

  get _upper_bound() {
    return (this._config && this._config.upper_bound !== undefined) ? this._config.upper_bound : '';
  }

  get _decimals() {
    return (this._config && this._config.decimals !== undefined) ? this._config.decimals : '';
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
          ${this.renderSection('entities', `🏠 ${t('editor.sections.entities')}`, t('editor.sections.add_configure_and_manage_all_your_entities'), this.renderEntitiesSection())}

          <!-- DISPLAY OPTIONS -->
          ${this.renderSection('display', `🎨 ${t('editor.sections.display_options')}`, t('editor.sections.name_icon_and_visual_appearance_settings'), this.renderDisplaySection())}

          <!-- GRAPH SETTINGS -->
          ${this.renderSection('graph', `📊 ${t('editor.sections.graph_settings')}`, t('editor.sections.graph_type_colors_and_visual_properties'), this.renderGraphSection())}

          <!-- DATA & TIME -->
          ${this.renderSection('data', `⏱️ ${t('editor.sections.data_time')}`, t('editor.sections.data_aggregation_and_time_configuration'), this.renderDataSection())}

          <!-- SCALE & BOUNDS -->
          ${this.renderSection('bounds', `📏 ${t('editor.sections.scale_bounds')}`, t('editor.sections.y_axis_bounds_and_scaling_options'), this.renderBoundsSection())}

          <!-- COLORS & THRESHOLDS -->
          ${this.renderSection('colors', `🎨 ${t('editor.sections.colors_thresholds')}`, t('editor.sections.color_configuration_and_dynamic_thresholds'), this.renderColorsSection())}

          <!-- ADVANCED OPTIONS -->
          ${this.renderSection('advanced', `⚙️ ${t('editor.sections.advanced_options')}`, t('editor.sections.advanced_options_and_performance_settings'), this.renderAdvancedSection())}

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

  renderEntitiesSection() {
    return html`
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
    `;
  }

  renderDisplaySection() {
    return html`
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
    `;
  }

  renderGraphSection() {
    return html`
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
    `;
  }

  renderDataSection() {
    return html`
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
    `;
  }

  renderBoundsSection() {
    return html`
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
    `;
  }

  renderColorsSection() {
    return html`
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
    `;
  }

  renderAdvancedSection() {
    return html`
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
    `;
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
    return getEntityInfo(this.hass, entityId);
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
    return editorStyles;
  }
}

// Simple config getters: `this._<key>` returns the configured value or the
// listed default. Defined in bulk to avoid ~30 near-identical accessors.
// Special-cased getters (booleans, bounds, line_color) stay explicit above.
const SIMPLE_GETTERS = {
  entity: '',
  entities: [],
  name: '',
  icon: '',
  icon_image: '',
  unit: '',
  height: 100,
  line_width: 5,
  bar_spacing: 4,
  hours_to_show: 24,
  points_per_hour: 0.5,
  aggregate_func: 'avg',
  group_by: 'interval',
  update_interval: '',
  hour24: false,
  min_bound_range: '',
  logarithmic: false,
  color_thresholds: [],
  color_thresholds_transition: 'smooth',
  font_size: 100,
  font_size_header: 14,
  align_header: 'default',
  align_icon: 'right',
  align_state: 'left',
  group: false,
  show: {},
  tap_action: { action: 'more-info' },
};

Object.entries(SIMPLE_GETTERS).forEach(([key, fallback]) => {
  Object.defineProperty(MiniGraphCardEditor.prototype, `_${key}`, {
    get() {
      return (this._config && this._config[key]) || fallback;
    },
  });
});

customElements.define('mini-graph-card-editor', MiniGraphCardEditor);
