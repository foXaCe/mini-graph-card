import { LitElement, html, css } from 'lit-element';
import { fireEvent } from 'custom-card-helpers';

const options = {
  required: {
    icon: 'tune',
    name: 'Required',
    secondary: 'Options required for the card to function',
    show: true,
  },
  appearance: {
    icon: 'palette',
    name: 'Appearance',
    secondary: 'Options affecting the visual appearance',
    show: false,
  },
  chart: {
    icon: 'chart-line',
    name: 'Chart',
    secondary: 'Chart specific options',
    show: false,
  },
};

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
    Object.keys(options).forEach((section) => {
      this._toggle[section] = options[section].show;
    });
  }

  get _entities() {
    return this._config.entities || [];
  }

  get _entity() {
    return this._config.entity || '';
  }

  get _name() {
    return this._config.name || '';
  }

  get _icon() {
    return this._config.icon || '';
  }

  get _hours_to_show() {
    return this._config.hours_to_show || 24;
  }

  get _points_per_hour() {
    return this._config.points_per_hour || 1;
  }

  get _line_width() {
    return this._config.line_width || 5;
  }

  get _height() {
    return this._config.height || 100;
  }

  get _animate() {
    return this._config.animate !== false;
  }

  get _show() {
    return this._config.show || {};
  }

  render() {
    if (!this.hass) {
      return html``;
    }

    return html`
      <div class="card-config">
        <div class="header">
          <div class="title">Mini Graph Card Configuration</div>
          <div class="subtitle">Configure your graph card settings</div>
        </div>

        ${this.renderSection('required')}
        ${this.renderSection('appearance')}
        ${this.renderSection('chart')}
      </div>
    `;
  }

  renderSection(section) {
    const { icon, name, secondary } = options[section];
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
      case 'required':
        return this.renderRequired();
      case 'appearance':
        return this.renderAppearance();
      case 'chart':
        return this.renderChart();
      default:
        return html``;
    }
  }

  renderRequired() {
    return html`
      <div class="section-content">
        <div class="form-group">
          <ha-entity-picker
            label="Entity"
            .hass="${this.hass}"
            .value="${this._entity}"
            @value-changed="${this._valueChanged}"
            .configValue="${'entity'}"
            allow-custom-entity
          ></ha-entity-picker>
        </div>

        <div class="form-group">
          <ha-textfield
            label="Name (Optional)"
            .value="${this._name}"
            .configValue="${'name'}"
            @input="${this._valueChanged}"
          ></ha-textfield>
        </div>

        <div class="form-group">
          <ha-icon-picker
            label="Icon (Optional)"
            .value="${this._icon}"
            .configValue="${'icon'}"
            .hass="${this.hass}"
            @value-changed="${this._valueChanged}"
          ></ha-icon-picker>
        </div>
      </div>
    `;
  }

  renderAppearance() {
    return html`
      <div class="section-content">
        <div class="form-row">
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

          <div class="form-group">
            <ha-textfield
              label="Height"
              type="number"
              min="50"
              max="500"
              .value="${this._height}"
              .configValue="${'height'}"
              @input="${this._valueChanged}"
            ></ha-textfield>
          </div>
        </div>

        <div class="form-group">
          <ha-formfield label="Animate">
            <ha-switch
              .checked="${this._animate}"
              .configValue="${'animate'}"
              @change="${this._valueChanged}"
            ></ha-switch>
          </ha-formfield>
        </div>

        <div class="show-options">
          <div class="show-header">Show Options</div>
          ${this.renderShowOptions()}
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

  renderChart() {
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
              min="1"
              max="60"
              .value="${this._points_per_hour}"
              .configValue="${'points_per_hour'}"
              @input="${this._valueChanged}"
            ></ha-textfield>
          </div>
        </div>
      </div>
    `;
  }

  _toggleSection(section) {
    this._toggle = { ...this._toggle, [section]: !this._toggle[section] };
  }

  _valueChanged(ev) {
    if (!this._config || !this.hass) {
      return;
    }

    const { target } = ev;
    const { configValue } = target;

    if (this[`_${configValue}`] === target.value) {
      return;
    }

    let { value } = target;
    if (target.type === 'number') {
      value = Number(value);
    } else if (target.type === 'checkbox') {
      value = target.checked;
    }

    if (configValue) {
      this._config = { ...this._config, [configValue]: value };
      fireEvent(this, 'config-changed', { config: this._config });
    }
  }

  _showChanged(ev) {
    if (!this._config || !this.hass) {
      return;
    }

    const { target } = ev;
    const { configValue } = target;
    const value = target.checked;

    this._config = {
      ...this._config,
      show: { ...this._show, [configValue]: value },
    };

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
      }

      ha-textfield,
      ha-entity-picker,
      ha-icon-picker {
        width: 100%;
      }

      ha-formfield {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
      }

      .show-options {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid var(--divider-color);
      }

      .show-header {
        font-weight: 500;
        margin-bottom: 12px;
        color: var(--primary-text-color);
      }

      .show-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 8px;
      }

      @media (max-width: 600px) {
        .form-row {
          grid-template-columns: 1fr;
        }

        .show-grid {
          grid-template-columns: 1fr;
        }
      }
    `;
  }
}

customElements.define('mini-graph-card-editor', MiniGraphCardEditor);
