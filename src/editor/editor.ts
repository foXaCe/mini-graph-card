import { LitElement, html, type TemplateResult } from 'lit';
import { fireEvent } from 'custom-card-helpers';
import { localize } from '../localize';
import editorStyles from './styles';
import { getEntityInfo, type EntityInfo } from './helpers';
import type { EntityConfig, HomeAssistant } from '../types';

// The editor manipulates a partial, still-loose config object (entities may be
// strings before normalisation, arbitrary keys get written by the handlers).
type EditorConfig = {
  entity?: string;
  entities?: Array<string | EntityConfig>;
  show?: Record<string, unknown>;
  tap_action?: { action: string; [key: string]: unknown };
  [key: string]: unknown;
};

type Option = { value: string; label: string };

// Editor-scoped translation helper. The active hass is captured at render
// time (see render()) so every t('...') call resolves to the user's
// Home Assistant language via the shared localize module.
let editorHass: HomeAssistant | null = null;
const t = (key: string): string => localize(key, editorHass);

export default class MiniGraphCardEditor extends LitElement {
  hass!: HomeAssistant;

  _config?: EditorConfig;

  _expandedSections!: Record<string, boolean>;

  _expandedEntities!: number[];

  // SIMPLE_GETTERS — installed on the prototype at the bottom of this file via
  // Object.defineProperty. Declared here (no emit) so the type system knows them.
  declare readonly _entity: string;

  declare readonly _entities: Array<string | EntityConfig>;

  declare readonly _name: string;

  declare readonly _icon: string;

  declare readonly _icon_image: string;

  declare readonly _unit: string;

  declare readonly _height: number;

  declare readonly _line_width: number;

  declare readonly _bar_spacing: number;

  declare readonly _hours_to_show: number;

  declare readonly _points_per_hour: number;

  declare readonly _aggregate_func: string;

  declare readonly _group_by: string;

  declare readonly _update_interval: string | number;

  declare readonly _hour24: boolean;

  declare readonly _min_bound_range: string | number;

  declare readonly _logarithmic: boolean;

  declare readonly _color_thresholds: Array<{ value: number; color: string }>;

  declare readonly _color_thresholds_transition: string;

  declare readonly _font_size: number;

  declare readonly _font_size_header: number;

  declare readonly _align_header: string;

  declare readonly _align_icon: string;

  declare readonly _align_state: string;

  declare readonly _group: boolean;

  declare readonly _appearance: string;

  declare readonly _show: Record<string, unknown>;

  declare readonly _tap_action: { action: string; navigation_path?: string; url?: string; service?: string; [key: string]: unknown };

  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
      _expandedSections: { state: true },
      _expandedEntities: { state: true },
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

  setConfig(config: EditorConfig): void {
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
  get _line_color(): string {
    return Array.isArray(this._config && this._config.line_color)
      ? (this._config!.line_color as string[]).join(', ')
      : ((this._config && (this._config.line_color as string)) || '');
  }

  get _animate(): boolean {
    return this._config ? (this._config.animate !== false) : true;
  }

  get _smoothing(): boolean {
    return this._config ? (this._config.smoothing !== false) : true;
  }

  get _cache(): boolean {
    return this._config ? (this._config.cache !== false) : true;
  }

  get _compress(): boolean {
    return this._config ? (this._config.compress !== false) : true;
  }

  get _lower_bound(): string | number {
    return (this._config && this._config.lower_bound !== undefined) ? (this._config.lower_bound as string | number) : '';
  }

  get _upper_bound(): string | number {
    return (this._config && this._config.upper_bound !== undefined) ? (this._config.upper_bound as string | number) : '';
  }

  get _decimals(): string | number {
    return (this._config && this._config.decimals !== undefined) ? (this._config.decimals as number) : '';
  }

  // ── Native HA field builders ──────────────────────────────────────────────
  // The editor uses HA's own form controls (ha-textfield / ha-select / ha-switch)
  // so it inherits Material 3 theming, RTL, and accessibility for free.

  private _field(label: string, value: unknown, key: string, type = 'text'): TemplateResult {
    return html`
      <div class="form-group">
        <label>${label}:</label>
        <ha-textfield
          type=${type}
          .value=${value === undefined || value === null ? '' : String(value)}
          @change=${(e: Event) => this._valueChanged(e, key)}
        ></ha-textfield>
      </div>
    `;
  }

  private _select(label: string, value: string, key: string, options: Option[]): TemplateResult {
    return html`
      <div class="form-group">
        <label>${label}:</label>
        <ha-select
          .value=${value}
          .naturalMenuWidth=${true}
          .fixedMenuPosition=${true}
          @selected=${(e: Event) => this._valueChanged(e, key)}
          @closed=${(e: Event) => e.stopPropagation()}
        >
          ${options.map((o) => html`<ha-list-item value=${o.value}>${o.label}</ha-list-item>`)}
        </ha-select>
      </div>
    `;
  }

  private _toggle(label: string, checked: boolean, key: string): TemplateResult {
    return html`
      <ha-formfield label=${label}>
        <ha-switch .checked=${checked} @change=${(e: Event) => this._valueChanged(e, key)}></ha-switch>
      </ha-formfield>
    `;
  }

  render(): TemplateResult {
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

          ${this.renderSection('entities', `🏠 ${t('editor.sections.entities')}`, t('editor.sections.add_configure_and_manage_all_your_entities'), this.renderEntitiesSection())}
          ${this.renderSection('display', `🎨 ${t('editor.sections.display_options')}`, t('editor.sections.name_icon_and_visual_appearance_settings'), this.renderDisplaySection())}
          ${this.renderSection('graph', `📊 ${t('editor.sections.graph_settings')}`, t('editor.sections.graph_type_colors_and_visual_properties'), this.renderGraphSection())}
          ${this.renderSection('data', `⏱️ ${t('editor.sections.data_time')}`, t('editor.sections.data_aggregation_and_time_configuration'), this.renderDataSection())}
          ${this.renderSection('bounds', `📏 ${t('editor.sections.scale_bounds')}`, t('editor.sections.y_axis_bounds_and_scaling_options'), this.renderBoundsSection())}
          ${this.renderSection('colors', `🎨 ${t('editor.sections.colors_thresholds')}`, t('editor.sections.color_configuration_and_dynamic_thresholds'), this.renderColorsSection())}
          ${this.renderSection('advanced', `⚙️ ${t('editor.sections.advanced_options')}`, t('editor.sections.advanced_options_and_performance_settings'), this.renderAdvancedSection())}
        </div>
      `;
    } catch (error) {
      return html`
        <div class="error">
          <h3>${t('editor.messages.editor_error')}</h3>
          <p>${t('editor.messages.an_error_occurred_while_rendering_the_editor')}: ${(error as Error).message}</p>
          <pre>${(error as Error).stack}</pre>
        </div>
      `;
    }
  }

  renderEntitiesSection(): TemplateResult {
    return html`
      ${this._entities.length === 0 ? html`
        <div class="form-group">
          <label>${t('editor.labels.primary_entity_will_be_converted_to_entities_list')}:</label>
          ${this.renderEntityPicker(this._entity, (ev: Event) => this._primaryEntityChanged(ev))}
        </div>
      ` : ''}

      <div class="entities-section">
        ${this._entities.map((entity, index) => html`
          <div class="entity-management-row">
            <div class="entity-top-section">
              <div class="entity-picker-section">
                ${this.renderEntityPicker(
    typeof entity === 'string' ? entity : entity.entity,
    (ev: Event) => this._entityListChanged(ev, index),
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

  renderDisplaySection(): TemplateResult {
    return html`
      <div class="form-row">
        ${this._field(t('editor.labels.card_name'), this._name, 'name')}
        <div class="form-group">
          <label>${t('editor.labels.icon')}:</label>
          ${this.renderIconPicker(this._icon, (ev: Event) => this._valueChanged(ev, 'icon'))}
        </div>
      </div>

      <div class="form-row">
        ${this._field(t('editor.labels.icon_image_url'), this._icon_image, 'icon_image')}
        ${this._field(t('editor.labels.unit'), this._unit, 'unit')}
      </div>

      <div class="form-row">
        ${this._field(t('editor.labels.font_size'), this._font_size, 'font_size', 'number')}
        ${this._field(t('editor.labels.header_font_size_px'), this._font_size_header, 'font_size_header', 'number')}
      </div>

      <div class="form-row">
        ${this._select(t('editor.labels.header_alignment'), this._align_header, 'align_header', [
    { value: 'default', label: t('editor.options.default') },
    { value: 'left', label: t('editor.options.left') },
    { value: 'right', label: t('editor.options.right') },
    { value: 'center', label: t('editor.options.center') },
  ])}
        ${this._select(t('editor.labels.icon_alignment'), this._align_icon, 'align_icon', [
    { value: 'left', label: t('editor.options.left') },
    { value: 'right', label: t('editor.options.right') },
    { value: 'center', label: t('editor.options.center') },
    { value: 'state', label: t('editor.options.with_state') },
  ])}
      </div>

      <div class="form-row">
        ${this._select(t('editor.labels.state_alignment'), this._align_state, 'align_state', [
    { value: 'left', label: t('editor.options.left') },
    { value: 'right', label: t('editor.options.right') },
    { value: 'center', label: t('editor.options.center') },
  ])}
        ${this._field(t('editor.labels.decimal_places'), this._decimals, 'decimals', 'number')}
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
  ].map((option) => html`
            <div class="checkbox-item">
              <ha-formfield label=${option.label}>
                <ha-switch
                  .checked=${this._show[option.key] !== false}
                  @change=${(ev: Event) => this._showChanged(ev, option.key)}
                ></ha-switch>
              </ha-formfield>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  renderGraphSection(): TemplateResult {
    return html`
      <div class="form-row">
        ${this._field(t('editor.labels.height_px'), this._height, 'height', 'number')}
        ${this._field(t('editor.labels.line_width'), this._line_width, 'line_width', 'number')}
      </div>

      <div class="form-row">
        ${this._field(t('editor.labels.line_colors_comma_separated'), this._line_color, 'line_color')}
        ${this._field(t('editor.labels.bar_spacing'), this._bar_spacing, 'bar_spacing', 'number')}
      </div>

      <div class="form-row">
        <div class="form-group">${this._toggle(t('editor.labels.enable_animation'), this._animate, 'animate')}</div>
        <div class="form-group">${this._toggle(t('editor.labels.smooth_lines'), this._smoothing, 'smoothing')}</div>
      </div>

      <div class="form-row">
        <div class="form-group">${this._toggle(t('editor.labels.logarithmic_scale'), this._logarithmic, 'logarithmic')}</div>
      </div>
    `;
  }

  renderDataSection(): TemplateResult {
    return html`
      <div class="form-row">
        ${this._field(t('editor.labels.hours_to_show'), this._hours_to_show, 'hours_to_show', 'number')}
        ${this._field(t('editor.labels.points_per_hour'), this._points_per_hour, 'points_per_hour', 'number')}
      </div>

      <div class="form-row">
        ${this._select(t('editor.labels.aggregate_function'), this._aggregate_func, 'aggregate_func', [
    { value: 'avg', label: t('editor.options.average') },
    { value: 'median', label: t('editor.options.median') },
    { value: 'min', label: t('editor.options.minimum') },
    { value: 'max', label: t('editor.options.maximum') },
    { value: 'first', label: t('editor.options.first') },
    { value: 'last', label: t('editor.options.last') },
    { value: 'sum', label: t('editor.options.sum') },
    { value: 'delta', label: t('editor.options.delta') },
    { value: 'diff', label: t('editor.options.difference') },
  ])}
        ${this._select(t('editor.labels.group_by'), this._group_by, 'group_by', [
    { value: 'interval', label: t('editor.options.interval') },
    { value: 'date', label: t('editor.options.date') },
    { value: 'hour', label: t('editor.options.hour') },
  ])}
      </div>

      <div class="form-row">
        ${this._field(t('editor.labels.update_interval_seconds'), this._update_interval, 'update_interval', 'number')}
        <div class="form-group">${this._toggle(t('editor.labels.time_format_24h'), this._hour24, 'hour24')}</div>
      </div>
    `;
  }

  renderBoundsSection(): TemplateResult {
    return html`
      <h4>${t('editor.labels.primary_y_axis')}</h4>
      <div class="form-row">
        ${this._field(t('editor.labels.lower_bound_use_n_for_soft'), this._lower_bound, 'lower_bound')}
        ${this._field(t('editor.labels.upper_bound_use_n_for_soft'), this._upper_bound, 'upper_bound')}
      </div>
      ${this._field(t('editor.labels.minimum_range'), this._min_bound_range, 'min_bound_range', 'number')}
    `;
  }

  renderColorsSection(): TemplateResult {
    return html`
      ${this._select(t('editor.labels.threshold_transition'), this._color_thresholds_transition, 'color_thresholds_transition', [
    { value: 'smooth', label: t('editor.options.smooth') },
    { value: 'hard', label: t('editor.options.hard') },
  ])}

      <div class="thresholds-section">
        <div class="thresholds-header">
          <h4>${t('editor.labels.color_thresholds')}</h4>
          <button class="btn-add" @click="${this._addThreshold}">${t('editor.buttons.add_threshold')}</button>
        </div>

        ${this._color_thresholds.map((threshold, index) => html`
          <div class="threshold-row">
            <ha-textfield
              type="number"
              .value=${threshold.value === undefined ? '' : String(threshold.value)}
              @change=${(ev: Event) => this._thresholdChanged(ev, index, 'value')}
              placeholder="${t('editor.placeholders.value')}"
            ></ha-textfield>
            <input
              type="color"
              .value="${threshold.color}"
              @input="${(ev: Event) => this._thresholdChanged(ev, index, 'color')}"
            />
            <button class="btn-remove" @click="${() => this._removeThreshold(index)}">${t('editor.buttons.remove')}</button>
          </div>
        `)}
      </div>
    `;
  }

  renderAdvancedSection(): TemplateResult {
    return html`
      <div class="form-row">
        <div class="form-group">${this._toggle(t('editor.labels.cache_data'), this._cache, 'cache')}</div>
        <div class="form-group">${this._toggle(t('editor.labels.compress_data'), this._compress, 'compress')}</div>
      </div>

      <div class="form-group">${this._toggle(t('editor.labels.group_entities'), this._group, 'group')}</div>

      ${this._select(t('editor.labels.appearance'), this._appearance, 'appearance', [
    { value: 'premium', label: t('editor.options.premium') },
    { value: 'minimal', label: t('editor.options.minimal') },
  ])}

      <div class="tap-action-section">
        <h4>${t('editor.tap_action.tap_action')}</h4>
        <div class="form-row">
          <div class="form-group">
            <label>${t('editor.tap_action.action_type')}:</label>
            <ha-select
              .value=${this._tap_action.action}
              .naturalMenuWidth=${true}
              .fixedMenuPosition=${true}
              @selected=${(ev: Event) => this._tapActionChanged(ev, 'action')}
              @closed=${(ev: Event) => ev.stopPropagation()}
            >
              <ha-list-item value="more-info">${t('editor.tap_action.more_info')}</ha-list-item>
              <ha-list-item value="navigate">${t('editor.tap_action.navigate')}</ha-list-item>
              <ha-list-item value="call-service">${t('editor.tap_action.call_service')}</ha-list-item>
              <ha-list-item value="url">${t('editor.tap_action.open_url')}</ha-list-item>
              <ha-list-item value="none">${t('editor.tap_action.no_action')}</ha-list-item>
            </ha-select>
          </div>

          ${this._tap_action.action === 'navigate' ? html`
            <div class="form-group">
              <label>${t('editor.tap_action.navigation_path')}:</label>
              <ha-textfield
                .value=${this._tap_action.navigation_path || ''}
                @change=${(ev: Event) => this._tapActionChanged(ev, 'navigation_path')}
                placeholder="/lovelace/dashboard"
              ></ha-textfield>
            </div>
          ` : ''}

          ${this._tap_action.action === 'url' ? html`
            <div class="form-group">
              <label>${t('editor.tap_action.url')}:</label>
              <ha-textfield
                .value=${this._tap_action.url || ''}
                @change=${(ev: Event) => this._tapActionChanged(ev, 'url')}
                placeholder="https://example.com"
              ></ha-textfield>
            </div>
          ` : ''}

          ${this._tap_action.action === 'call-service' ? html`
            <div class="form-group">
              <label>${t('editor.tap_action.service')}:</label>
              <ha-textfield
                .value=${this._tap_action.service || ''}
                @change=${(ev: Event) => this._tapActionChanged(ev, 'service')}
                placeholder="light.toggle"
              ></ha-textfield>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  renderSection(key: string, title: string, description: string, content: TemplateResult): TemplateResult {
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

  renderEntityPicker(value: string, handler: (ev: Event) => void): TemplateResult {
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
    } catch {
      // Fallback silently to simple input
    }

    return html`
      <ha-textfield
        .value="${value}"
        @change="${handler}"
        placeholder="sensor.temperature"
      ></ha-textfield>
    `;
  }

  renderIconPicker(value: string, handler: (ev: Event) => void): TemplateResult {
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
    } catch {
      // Fallback silently to simple input
    }

    return html`
      <ha-textfield
        .value="${value}"
        @change="${handler}"
        placeholder="mdi:thermometer"
      ></ha-textfield>
    `;
  }

  renderEntityConfig(entity: string | EntityConfig, index: number): TemplateResult {
    const config = (typeof entity === 'string' ? {} : entity) as Record<string, unknown>;

    return html`
      <div class="entity-config-content">
        <div class="form-row">
          <div class="form-group">
            <label>${t('editor.entity.custom_name')}:</label>
            <ha-textfield
              .value="${(config.name as string) || ''}"
              @change="${(ev: Event) => this._entityConfigChanged(ev, index, 'name')}"
            ></ha-textfield>
          </div>

          <div class="form-group">
            <label>${t('editor.entity.custom_color')}:</label>
            <input
              type="color"
              .value="${(config.color as string) || '#ff0000'}"
              @input="${(ev: Event) => this._entityConfigChanged(ev, index, 'color')}"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${t('editor.entity.attribute_instead_of_state')}:</label>
            <ha-textfield
              .value="${(config.attribute as string) || ''}"
              @change="${(ev: Event) => this._entityConfigChanged(ev, index, 'attribute')}"
              placeholder="temperature"
            ></ha-textfield>
          </div>

          <div class="form-group">
            <label>${t('editor.entity.y_axis')}:</label>
            <ha-select
              .value="${(config.y_axis as string) || 'primary'}"
              .naturalMenuWidth=${true}
              .fixedMenuPosition=${true}
              @selected="${(ev: Event) => this._entityConfigChanged(ev, index, 'y_axis')}"
              @closed="${(ev: Event) => ev.stopPropagation()}"
            >
              <ha-list-item value="primary">${t('editor.options.primary')}</ha-list-item>
              <ha-list-item value="secondary">${t('editor.options.secondary')}</ha-list-item>
            </ha-select>
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
  ].map((option) => html`
            <div class="checkbox-item">
              <ha-formfield label=${t(option.label)}>
                <ha-switch
                  .checked=${config[option.key] !== false}
                  @change=${(ev: Event) => this._entityConfigChanged(ev, index, option.key)}
                ></ha-switch>
              </ha-formfield>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  // Helper methods
  getEntityInfo(entityId: string): EntityInfo {
    return getEntityInfo(this.hass, entityId);
  }

  // Read a value from any of the HA controls: ha-switch (checked), ha-textfield
  // type=number (parsed), pickers (value-changed detail), else .value.
  private _readValue(ev: Event): unknown {
    const target = ev.target as (HTMLInputElement & { localName?: string }) | null;
    if (!target) return undefined;
    if (target.localName === 'ha-switch' || target.type === 'checkbox') return target.checked;
    const detail = (ev as CustomEvent).detail;
    if (detail && detail.value !== undefined) return detail.value;
    if (target.type === 'number') return target.value === '' ? undefined : Number(target.value);
    return target.value;
  }

  // Event handlers
  _toggleSection(key: string): void {
    this._expandedSections = {
      ...this._expandedSections,
      [key]: !this._expandedSections[key],
    };
    this.requestUpdate();
  }

  _primaryEntityChanged(ev: Event): void {
    const value = this._readValue(ev) as string | undefined;

    if (value && !this._entities.length) {
      this._config = { ...this._config, entities: [value] };
      delete this._config.entity;
      fireEvent(this, 'config-changed', { config: this._config });
    }
  }

  _addEntity(): void {
    const entities = [...this._entities, ''];
    this._config = { ...this._config, entities };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _removeEntity(index: number): void {
    const entities = [...this._entities];
    entities.splice(index, 1);
    this._config = { ...this._config, entities };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _entityListChanged(ev: Event, index: number): void {
    const value = this._readValue(ev) as string | undefined;
    if (!value) return;

    const entities = [...this._entities];
    entities[index] = value;
    this._config = { ...this._config, entities };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _valueChanged(ev: Event, key: string): void {
    if (!this._config || !this.hass) return;

    let value = this._readValue(ev);
    if (key === 'line_color' && typeof value === 'string' && value.includes(',')) {
      value = value.split(',').map((c) => c.trim());
    }

    // Guard against ha-select's mount-time re-fire and no-op writes (which would
    // otherwise trigger a render → control re-creation → event loop).
    if (JSON.stringify(this._config[key]) === JSON.stringify(value)) return;

    this._config = { ...this._config, [key]: value };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _showChanged(ev: Event, key: string): void {
    if (!this._config || !this.hass) return;

    const value = (ev.target as HTMLInputElement).checked;
    this._config = {
      ...this._config,
      show: { ...this._show, [key]: value },
    };

    fireEvent(this, 'config-changed', { config: this._config });
  }

  _addThreshold(): void {
    const thresholds = [...this._color_thresholds, { value: 0, color: '#ff0000' }];
    this._config = { ...this._config, color_thresholds: thresholds };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _removeThreshold(index: number): void {
    const thresholds = [...this._color_thresholds];
    thresholds.splice(index, 1);
    this._config = { ...this._config, color_thresholds: thresholds };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _thresholdChanged(ev: Event, index: number, field: string): void {
    const thresholds = [...this._color_thresholds];
    let value: string | number = (ev.target as HTMLInputElement).value;

    if (field === 'value') {
      value = Number(value);
    }

    thresholds[index] = { ...thresholds[index], [field]: value };
    this._config = { ...this._config, color_thresholds: thresholds };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _tapActionChanged(ev: Event, field: string): void {
    const value = (ev.target as HTMLInputElement).value;

    const tapAction = { ...this._tap_action, [field]: value };
    this._config = { ...this._config, tap_action: tapAction };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _toggleEntityConfig(index: number): void {
    this._expandedEntities = this._expandedEntities || [];
    const isExpanded = this._expandedEntities.includes(index);

    if (isExpanded) {
      this._expandedEntities = this._expandedEntities.filter((i) => i !== index);
    } else {
      this._expandedEntities = [...this._expandedEntities, index];
    }

    this.requestUpdate();
  }

  _isEntityConfigExpanded(index: number): boolean {
    return this._expandedEntities && this._expandedEntities.includes(index);
  }

  _entityConfigChanged(ev: Event, index: number, field: string): void {
    const entities = [...this._entities];
    const entityConfig: Record<string, unknown> = typeof entities[index] === 'string'
      ? { entity: entities[index] }
      : { ...(entities[index] as EntityConfig) };

    entityConfig[field] = this._readValue(ev);
    entities[index] = entityConfig as unknown as EntityConfig;

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
const SIMPLE_GETTERS: Record<string, unknown> = {
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
  appearance: 'premium',
  show: {},
  tap_action: { action: 'more-info' },
};

Object.entries(SIMPLE_GETTERS).forEach(([key, fallback]) => {
  Object.defineProperty(MiniGraphCardEditor.prototype, `_${key}`, {
    get(this: MiniGraphCardEditor) {
      return (this._config && this._config[key]) || fallback;
    },
  });
});

customElements.define('mini-graph-card-editor', MiniGraphCardEditor);
