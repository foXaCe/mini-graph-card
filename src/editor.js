import { LitElement, html, css } from 'lit-element';
import { fireEvent } from 'custom-card-helpers';

export default class MiniGraphCardEditor extends LitElement {
  static get properties() {
    return {
      hass: Object,
      _config: Object,
    };
  }

  setConfig(config) {
    this._config = { ...config };
  }

  get _entity() {
    return this._config.entity || '';
  }

  get _entities() {
    return this._config.entities || [];
  }

  get _name() {
    return this._config.name || '';
  }

  get _icon() {
    return this._config.icon || '';
  }

  get _height() {
    return this._config.height || 100;
  }

  get _hours_to_show() {
    return this._config.hours_to_show || 24;
  }

  get _points_per_hour() {
    return this._config.points_per_hour || 0.5;
  }

  get _line_width() {
    return this._config.line_width || 5;
  }

  get _animate() {
    return this._config.animate !== false;
  }

  get _show() {
    return this._config.show || {};
  }

  render() {
    if (!this.hass) {
      return html`<div>Loading...</div>`;
    }

    return html`
      <div class="card-config">
        <div class="header">
          <h2>Mini Graph Card Configuration</h2>
          <p>Configure your graph card settings</p>
        </div>

        <!-- ENTITY SELECTION -->
        <div class="section">
          <h3>🔧 Required Settings</h3>

          ${this._entities.length === 0 ? html`
            <div class="form-group">
              <label>Primary Entity:</label>
              <ha-entity-picker
                .hass="${this.hass}"
                .value="${this._entity}"
                @value-changed="${this._entityChanged}"
                allow-custom-entity
              ></ha-entity-picker>
            </div>
          ` : ''}

          <div class="form-group">
            <label>Entities List:</label>
            ${this._entities.map((entity, index) => html`
              <div class="entity-row">
                <ha-entity-picker
                  .hass="${this.hass}"
                  .value="${typeof entity === 'string' ? entity : entity.entity}"
                  @value-changed="${ev => this._entityListChanged(ev, index)}"
                  allow-custom-entity
                ></ha-entity-picker>
                <button @click="${() => this._removeEntity(index)}">Remove</button>
              </div>
            `)}
            <button @click="${this._addEntity}">Add Entity</button>
          </div>
        </div>

        <!-- DISPLAY OPTIONS -->
        <div class="section">
          <h3>🎨 Display Options</h3>

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
              <ha-icon-picker
                .hass="${this.hass}"
                .value="${this._icon}"
                @value-changed="${ev => this._valueChanged(ev, 'icon')}"
              ></ha-icon-picker>
            </div>
          </div>
        </div>

        <!-- GRAPH SETTINGS -->
        <div class="section">
          <h3>📊 Graph Settings</h3>

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

          <div class="form-group">
            <label>
              <input
                type="checkbox"
                .checked="${this._animate}"
                @change="${ev => this._valueChanged(ev, 'animate')}"
              />
              Enable Animation
            </label>
          </div>
        </div>

        <!-- DATA & TIME -->
        <div class="section">
          <h3>⏱️ Data & Time</h3>

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
        </div>

        <!-- VISIBILITY OPTIONS -->
        <div class="section">
          <h3>👁️ Show/Hide Options</h3>

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
      </div>
    `;
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

  _valueChanged(ev, key) {
    if (!this._config || !this.hass) return;

    let value;
    if (ev.target.type === 'checkbox') {
      value = ev.target.checked;
    } else if (ev.target.type === 'number') {
      value = Number(ev.target.value) || 0;
    } else if (ev.detail && ev.detail.value !== undefined) {
      ({ value } = ev.detail);
    } else {
      ({ value } = ev.target);
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

  static get styles() {
    return css`
      .card-config {
        padding: 20px;
        max-width: 600px;
        margin: 0 auto;
      }

      .header {
        text-align: center;
        margin-bottom: 30px;
      }

      .header h2 {
        color: var(--primary-text-color);
        margin-bottom: 5px;
      }

      .header p {
        color: var(--secondary-text-color);
        margin: 0;
      }

      .section {
        margin-bottom: 25px;
        padding: 20px;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        background: var(--card-background-color);
      }

      .section h3 {
        margin-top: 0;
        margin-bottom: 15px;
        color: var(--primary-text-color);
        font-size: 1.1em;
      }

      .form-group {
        margin-bottom: 15px;
      }

      .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
      }

      input[type="text"],
      input[type="number"] {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
      }

      button {
        padding: 8px 16px;
        background: var(--primary-color);
        color: var(--text-primary-color);
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      button:hover {
        opacity: 0.9;
      }

      .entity-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
      }

      .entity-row ha-entity-picker {
        flex: 1;
      }

      .checkbox-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 10px;
      }

      .checkbox-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 5px;
        cursor: pointer;
      }

      .checkbox-item input[type="checkbox"] {
        margin: 0;
      }

      ha-entity-picker,
      ha-icon-picker {
        width: 100%;
      }

      @media (max-width: 600px) {
        .form-row {
          grid-template-columns: 1fr;
        }

        .checkbox-grid {
          grid-template-columns: 1fr 1fr;
        }
      }
    `;
  }
}

customElements.define('mini-graph-card-editor', MiniGraphCardEditor);
