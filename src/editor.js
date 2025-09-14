import { LitElement, html, css } from 'lit-element';
import { fireEvent } from 'custom-card-helpers';


// French translations
const TRANSLATIONS_FR = {
  // Headers
  'Mini Graph Card Configuration': 'Configuration Mini Graph Card',
  'Complete configuration for all options': 'Configuration complète pour toutes les options',
  'Basic configuration required for the card': 'Configuration de base requise pour la carte',
  'Name, icon, and visual appearance settings': 'Nom, icône et paramètres d\'apparence visuelle',
  'Graph type, colors, and visual properties': 'Type de graphique, couleurs et propriétés visuelles',
  'Data aggregation and time configuration': 'Agrégation des données et configuration temporelle',
  'Y-axis bounds and scaling options': 'Limites de l\'axe Y et options d\'échelle',
  'Color configuration and dynamic thresholds': 'Configuration des couleurs et seuils dynamiques',
  'Advanced options and performance settings': 'Options avancées et paramètres de performance',
  'Per-entity configuration and customization': 'Configuration et personnalisation par entité',

  // Section titles
  'Required Settings': 'Paramètres requis',
  'Display Options': 'Options d\'affichage',
  'Graph Settings': 'Paramètres du graphique',
  'Data & Time': 'Données et temps',
  'Scale & Bounds': 'Échelle et limites',
  'Colors & Thresholds': 'Couleurs et seuils',
  'Advanced Options': 'Options avancées',
  'Entity Configuration': 'Configuration des entités',

  // Form labels
  'Primary Entity (will be converted to entities list)': 'Entité principale (sera convertie en liste d\'entités)',
  'Entities List': 'Liste des entités',
  'Card Name': 'Nom de la carte',
  'Icon': 'Icône',
  'Icon Image URL': 'URL de l\'image d\'icône',
  'Unit': 'Unité',
  'Font Size (%)': 'Taille de police (%)',
  'Header Font Size (px)': 'Taille de police de l\'en-tête (px)',
  'Header Alignment': 'Alignement de l\'en-tête',
  'Icon Alignment': 'Alignement de l\'icône',
  'State Alignment': 'Alignement de l\'état',
  'Decimal Places': 'Nombre de décimales',
  'Height (px)': 'Hauteur (px)',
  'Line Width': 'Épaisseur de ligne',
  'Line Colors (comma-separated)': 'Couleurs de ligne (séparées par des virgules)',
  'Bar Spacing': 'Espacement des barres',
  'Enable Animation': 'Activer l\'animation',
  'Smooth Lines': 'Lignes lissées',
  'Logarithmic Scale': 'Échelle logarithmique',
  'Hours to Show': 'Heures à afficher',
  'Points per Hour': 'Points par heure',
  'Aggregate Function': 'Fonction d\'agrégation',
  'Group By': 'Grouper par',
  'Update Interval (seconds)': 'Intervalle de mise à jour (secondes)',
  '24-Hour Time Format': 'Format 24 heures',
  'Lower Bound (use ~N for soft)': 'Limite inférieure (utiliser ~N pour souple)',
  'Upper Bound (use ~N for soft)': 'Limite supérieure (utiliser ~N pour souple)',
  'Minimum Range': 'Plage minimale',
  'Threshold Transition': 'Transition des seuils',
  'Color Thresholds': 'Seuils de couleur',
  'Cache Data': 'Cache des données',
  'Compress Data': 'Compression des données',
  'Group Entities': 'Grouper les entités',

  // Options
  'Default': 'Par défaut',
  'Left': 'Gauche',
  'Right': 'Droite',
  'Center': 'Centre',
  'With State': 'Avec l\'état',
  'Average': 'Moyenne',
  'Median': 'Médiane',
  'Minimum': 'Minimum',
  'Maximum': 'Maximum',
  'First': 'Premier',
  'Last': 'Dernier',
  'Sum': 'Somme',
  'Delta': 'Delta',
  'Difference': 'Différence',
  'Interval': 'Intervalle',
  'Date': 'Date',
  'Hour': 'Heure',
  'Smooth': 'Lisse',
  'Hard': 'Dur',

  // Visibility options
  'Visibility Options': 'Options de visibilité',
  'Name': 'Nom',
  'State': 'État',
  'Graph': 'Graphique',
  'Fill': 'Remplissage',
  'Legend': 'Légende',
  'Extrema': 'Extrema',
  'Labels': 'Étiquettes',
  'Secondary Labels': 'Étiquettes secondaires',
  'Points': 'Points',

  // Buttons
  'Add Entity': 'Ajouter une entité',
  'Remove': 'Supprimer',
  'Add Threshold': 'Ajouter un seuil',
  'Add State Mapping': 'Ajouter un mappage d\'état',

  // Placeholders
  'Card title': 'Titre de la carte',
  '°C, kW, etc.': '°C, kW, etc.',
  '#ff0000, #00ff00, #0000ff': '#ff0000, #00ff00, #0000ff',
  '0 or ~0': '0 ou ~0',
  '100 or ~100': '100 ou ~100',
  'Value': 'Valeur',
  'Color': 'Couleur',
  'Original Value': 'Valeur originale',
  'Display Label': 'Libellé affiché',

  // Loading and error messages
  'Loading Home Assistant...': 'Chargement de Home Assistant...',
  'Please wait while the editor loads.': 'Veuillez patienter pendant le chargement de l\'éditeur.',
  'Editor Error': 'Erreur de l\'éditeur',
  'An error occurred while rendering the editor:': 'Une erreur s\'est produite lors du rendu de l\'éditeur :',

  // Debug info
  'Debug: Config loaded = ': 'Debug : Config chargée = ',
  ', Entities = ': ', Entités = ',

  // Advanced sections
  'Primary Y-Axis': 'Axe Y principal',
  'Thresholds': 'Seuils',
  'Custom Name': 'Nom personnalisé',
  'Custom Color': 'Couleur personnalisée',
  'Configure individual entity settings. These override global settings for specific entities.': 'Configurez les paramètres individuels des entités. Ceux-ci remplacent les paramètres globaux pour des entités spécifiques.',
  'Configure': 'Configurer',
  'Hide': 'Masquer',
  'Attribute (instead of state)': 'Attribut (au lieu de l\'état)',
  'Y-Axis': 'Axe Y',
  'Primary': 'Principal',
  'Secondary': 'Secondaire',
  'Show State': 'Afficher l\'état',
  'Show in Graph': 'Afficher dans le graphique',
  'Show Line': 'Afficher la ligne',
  'Show Fill': 'Afficher le remplissage',
  'Show Points': 'Afficher les points',
  'Show in Legend': 'Afficher dans la légende',
  'Smoothing': 'Lissage',
  'Fixed Value': 'Valeur fixe',
};

// Get browser language
const getBrowserLanguage = () => {
  const lang = navigator.language || navigator.userLanguage || 'en';
  return lang.toLowerCase().startsWith('fr') ? 'fr' : 'en';
};

// Translation function
const t = (key) => {
  const lang = getBrowserLanguage();
  if (lang === 'fr' && TRANSLATIONS_FR[key]) {
    return TRANSLATIONS_FR[key];
  }
  return key; // Fallback to original English text
};

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
    if (!this.hass) {
      return html`
        <div class="loading">
          <h3>${t('Loading Home Assistant...')}</h3>
          <p>${t('Please wait while the editor loads.')}</p>
        </div>
      `;
    }

    try {
      return html`
        <div class="card-config">
          <div class="header">
            <h2>${t('Mini Graph Card Configuration')}</h2>
            <p>${t('Complete configuration for all options')}</p>
            <div class="debug-info">
              <small>${t('Debug: Config loaded = ')}${!!this._config}${t(', Entities = ')}${this._entities.length}</small>
            </div>
          </div>

          <!-- REQUIRED SETTINGS -->
          ${this.renderSection('required', `🔧 ${t('Required Settings')}`, t('Basic configuration required for the card'), html`
            ${this._entities.length === 0 ? html`
              <div class="form-group">
                <label>${t('Primary Entity (will be converted to entities list)')}:</label>
                ${this.renderEntityPicker(this._entity, ev => this._primaryEntityChanged(ev))}
              </div>
            ` : ''}

            <div class="form-group">
              <label>${t('Entities List')}:</label>
              ${this._entities.map((entity, index) => html`
                <div class="entity-row">
                  ${this.renderEntityPicker(
    typeof entity === 'string' ? entity : entity.entity,
    ev => this._entityListChanged(ev, index),
  )}
                </div>
              `)}
              <button class="btn-add" @click="${this._addEntity}">${t('Add Entity')}</button>
            </div>
          `)}

          <!-- DISPLAY OPTIONS -->
          ${this.renderSection('display', `🎨 ${t('Display Options')}`, t('Name, icon, and visual appearance settings'), html`
            <div class="form-row">
              <div class="form-group">
                <label>${t('Card Name')}:</label>
                <input
                  type="text"
                  .value="${this._name}"
                  @input="${ev => this._valueChanged(ev, 'name')}"
                  placeholder="${t('Card title')}"
                />
              </div>

              <div class="form-group">
                <label>${t('Icon')}:</label>
                ${this.renderIconPicker(this._icon, ev => this._valueChanged(ev, 'icon'))}
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>${t('Icon Image URL')}:</label>
                <input
                  type="text"
                  .value="${this._icon_image}"
                  @input="${ev => this._valueChanged(ev, 'icon_image')}"
                  placeholder="https://example.com/image.png"
                />
              </div>

              <div class="form-group">
                <label>${t('Unit')}:</label>
                <input
                  type="text"
                  .value="${this._unit}"
                  @input="${ev => this._valueChanged(ev, 'unit')}"
                  placeholder="${t('°C, kW, etc.')}"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>${t('Font Size (%)')}:</label>
                <input
                  type="number"
                  min="50"
                  max="200"
                  .value="${this._font_size}"
                  @input="${ev => this._valueChanged(ev, 'font_size')}"
                />
              </div>

              <div class="form-group">
                <label>${t('Header Font Size (px)')}:</label>
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
                <label>${t('Header Alignment')}:</label>
                <select .value="${this._align_header}" @change="${ev => this._valueChanged(ev, 'align_header')}">
                  <option value="default">${t('Default')}</option>
                  <option value="left">${t('Left')}</option>
                  <option value="right">${t('Right')}</option>
                  <option value="center">${t('Center')}</option>
                </select>
              </div>

              <div class="form-group">
                <label>${t('Icon Alignment')}:</label>
                <select .value="${this._align_icon}" @change="${ev => this._valueChanged(ev, 'align_icon')}">
                  <option value="left">${t('Left')}</option>
                  <option value="right">${t('Right')}</option>
                  <option value="center">${t('Center')}</option>
                  <option value="state">${t('With State')}</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>${t('State Alignment')}:</label>
                <select .value="${this._align_state}" @change="${ev => this._valueChanged(ev, 'align_state')}">
                  <option value="left">${t('Left')}</option>
                  <option value="right">${t('Right')}</option>
                  <option value="center">${t('Center')}</option>
                </select>
              </div>

              <div class="form-group">
                <label>${t('Decimal Places')}:</label>
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
              <h4>${t('Visibility Options')}</h4>
              <div class="checkbox-grid">
                ${[
    { key: 'name', label: t('Name') },
    { key: 'icon', label: t('Icon') },
    { key: 'state', label: t('State') },
    { key: 'graph', label: t('Graph') },
    { key: 'fill', label: t('Fill') },
    { key: 'points', label: t('Points') },
    { key: 'legend', label: t('Legend') },
    { key: 'extrema', label: t('Extrema') },
    { key: 'average', label: t('Average') },
    { key: 'labels', label: t('Labels') },
    { key: 'labels_secondary', label: t('Secondary Labels') },
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
          ${this.renderSection('graph', `📊 ${t('Graph Settings')}`, t('Graph type, colors, and visual properties'), html`
            <div class="form-row">
              <div class="form-group">
                <label>${t('Height (px)')}:</label>
                <input
                  type="number"
                  min="50"
                  max="500"
                  .value="${this._height}"
                  @input="${ev => this._valueChanged(ev, 'height')}"
                />
              </div>

              <div class="form-group">
                <label>${t('Line Width')}:</label>
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
                <label>${t('Line Colors (comma-separated)')}:</label>
                <input
                  type="text"
                  .value="${this._line_color}"
                  @input="${ev => this._valueChanged(ev, 'line_color')}"
                  placeholder="${t('#ff0000, #00ff00, #0000ff')}"
                />
              </div>

              <div class="form-group">
                <label>${t('Bar Spacing')}:</label>
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
                  ${t('Enable Animation')}
                </label>
              </div>

              <div class="form-group">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    .checked="${this._smoothing}"
                    @change="${ev => this._valueChanged(ev, 'smoothing')}"
                  />
                  ${t('Smooth Lines')}
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
                  ${t('Logarithmic Scale')}
                </label>
              </div>
            </div>
          `)}

          <!-- DATA & TIME -->
          ${this.renderSection('data', `⏱️ ${t('Data & Time')}`, t('Data aggregation and time configuration'), html`
            <div class="form-row">
              <div class="form-group">
                <label>${t('Hours to Show')}:</label>
                <input
                  type="number"
                  min="1"
                  max="168"
                  .value="${this._hours_to_show}"
                  @input="${ev => this._valueChanged(ev, 'hours_to_show')}"
                />
              </div>

              <div class="form-group">
                <label>${t('Points per Hour')}:</label>
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
                <label>${t('Aggregate Function')}:</label>
                <select .value="${this._aggregate_func}" @change="${ev => this._valueChanged(ev, 'aggregate_func')}">
                  <option value="avg">${t('Average')}</option>
                  <option value="median">${t('Median')}</option>
                  <option value="min">${t('Minimum')}</option>
                  <option value="max">${t('Maximum')}</option>
                  <option value="first">${t('First')}</option>
                  <option value="last">${t('Last')}</option>
                  <option value="sum">${t('Sum')}</option>
                  <option value="delta">${t('Delta')}</option>
                  <option value="diff">${t('Difference')}</option>
                </select>
              </div>

              <div class="form-group">
                <label>${t('Group By')}:</label>
                <select .value="${this._group_by}" @change="${ev => this._valueChanged(ev, 'group_by')}">
                  <option value="interval">${t('Interval')}</option>
                  <option value="date">${t('Date')}</option>
                  <option value="hour">${t('Hour')}</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>${t('Update Interval (seconds)')}:</label>
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
                  ${t('24-Hour Time Format')}
                </label>
              </div>
            </div>
          `)}

          <!-- SCALE & BOUNDS -->
          ${this.renderSection('bounds', `📏 ${t('Scale & Bounds')}`, t('Y-axis bounds and scaling options'), html`
            <h4>${t('Primary Y-Axis')}</h4>
            <div class="form-row">
              <div class="form-group">
                <label>${t('Lower Bound (use ~N for soft)')}:</label>
                <input
                  type="text"
                  .value="${this._lower_bound}"
                  @input="${ev => this._valueChanged(ev, 'lower_bound')}"
                  placeholder="${t('0 or ~0')}"
                />
              </div>

              <div class="form-group">
                <label>${t('Upper Bound (use ~N for soft)')}:</label>
                <input
                  type="text"
                  .value="${this._upper_bound}"
                  @input="${ev => this._valueChanged(ev, 'upper_bound')}"
                  placeholder="${t('100 or ~100')}"
                />
              </div>
            </div>

            <div class="form-group">
              <label>${t('Minimum Range')}:</label>
              <input
                type="number"
                min="0"
                .value="${this._min_bound_range}"
                @input="${ev => this._valueChanged(ev, 'min_bound_range')}"
              />
            </div>
          `)}

          <!-- COLORS & THRESHOLDS -->
          ${this.renderSection('colors', `🎨 ${t('Colors & Thresholds')}`, t('Color configuration and dynamic thresholds'), html`
            <div class="form-group">
              <label>${t('Threshold Transition')}:</label>
              <select .value="${this._color_thresholds_transition}" @change="${ev => this._valueChanged(ev, 'color_thresholds_transition')}">
                <option value="smooth">${t('Smooth')}</option>
                <option value="hard">${t('Hard')}</option>
              </select>
            </div>

            <div class="thresholds-section">
              <div class="thresholds-header">
                <h4>${t('Color Thresholds')}</h4>
                <button class="btn-add" @click="${this._addThreshold}">${t('Add Threshold')}</button>
              </div>

              ${this._color_thresholds.map((threshold, index) => html`
                <div class="threshold-row">
                  <input
                    type="number"
                    .value="${threshold.value}"
                    @input="${ev => this._thresholdChanged(ev, index, 'value')}"
                    placeholder="${t('Value')}"
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
          ${this.renderSection('advanced', `⚙️ ${t('Advanced Options')}`, t('Advanced options and performance settings'), html`
            <div class="form-row">
              <div class="form-group">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    .checked="${this._cache}"
                    @change="${ev => this._valueChanged(ev, 'cache')}"
                  />
                  ${t('Cache Data')}
                </label>
              </div>

              <div class="form-group">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    .checked="${this._compress}"
                    @change="${ev => this._valueChanged(ev, 'compress')}"
                  />
                  ${t('Compress Data')}
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
                ${t('Group Entities')}
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
          ${this.renderSection('entities', `🔧 ${t('Entity Configuration')}`, t('Per-entity configuration and customization'), html`
            <div class="entities-info">
              ${t('Configure individual entity settings. These override global settings for specific entities.')}
            </div>

            ${this._entities.map((entity, index) => html`
              <div class="entity-config">
                <div class="entity-config-header">
                  <span class="entity-name">${typeof entity === 'string' ? entity : entity.entity}</span>
                  <button @click="${() => this._toggleEntityConfig(index)}">
                    ${this._isEntityConfigExpanded(index) ? t('Hide') : t('Configure')}
                  </button>
                </div>

                ${this._isEntityConfigExpanded(index) ? this.renderEntityConfig(entity, index) : ''}
              </div>
            `)}
          `)}
        </div>
      `;
    } catch (error) {
      return html`
        <div class="error">
          <h3>${t('Editor Error')}</h3>
          <p>${t('An error occurred while rendering the editor:')}: ${error.message}</p>
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
            <label>${t('Custom Name')}:</label>
            <input
              type="text"
              .value="${config.name || ''}"
              @input="${ev => this._entityConfigChanged(ev, index, 'name')}"
            />
          </div>

          <div class="form-group">
            <label>${t('Custom Color')}:</label>
            <input
              type="color"
              .value="${config.color || '#ff0000'}"
              @input="${ev => this._entityConfigChanged(ev, index, 'color')}"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${t('Attribute (instead of state)')}:</label>
            <input
              type="text"
              .value="${config.attribute || ''}"
              @input="${ev => this._entityConfigChanged(ev, index, 'attribute')}"
              placeholder="temperature"
            />
          </div>

          <div class="form-group">
            <label>${t('Y-Axis')}:</label>
            <select .value="${config.y_axis || 'primary'}" @change="${ev => this._entityConfigChanged(ev, index, 'y_axis')}">
              <option value="primary">${t('Primary')}</option>
              <option value="secondary">${t('Secondary')}</option>
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
              ${t(option.label)}
            </label>
          `)}
        </div>
      </div>
    `;
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

      .entity-name {
        font-weight: 500;
        color: var(--primary-text-color);
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 16px;
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
