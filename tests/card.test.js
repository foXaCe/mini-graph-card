// @vitest-environment jsdom
import {
  describe, it, expect, beforeAll, vi,
} from 'vitest';
import '../src/main';

const make = () => document.createElement('mini-graph-card');

describe('mini-graph-card — registration & static API', () => {
  beforeAll(() => {
    expect(customElements.get('mini-graph-card')).toBeTypeOf('function');
  });

  it('exposes a stub config for the card picker', () => {
    const stub = customElements.get('mini-graph-card').getStubConfig();
    expect(stub.type).toBe('custom:mini-graph-card');
    expect(stub.entity).toBeTypeOf('string');
  });

  it('returns the visual editor element from getConfigElement', () => {
    const el = customElements.get('mini-graph-card').getConfigElement();
    expect(el.tagName.toLowerCase()).toBe('mini-graph-card-editor');
  });

  it('registers itself in window.customCards', () => {
    const entry = (window.customCards || []).find(c => c.type === 'mini-graph-card');
    expect(entry).toBeTruthy();
    expect(entry.name).toBeTypeOf('string');
  });

  describe('getEntitySuggestion (card-picker entity suggestion)', () => {
    const entry = () => window.customCards.find(c => c.type === 'mini-graph-card');
    const hass = {
      states: {
        'sensor.temp': { attributes: { unit_of_measurement: '°C' } },
        'sensor.energy': { attributes: { state_class: 'total_increasing' } },
        'sensor.text': { attributes: {} },
        'counter.coffee': { attributes: {} },
      },
    };

    it('suggests the card for a numeric sensor (unit or state_class)', () => {
      const s = entry().getEntitySuggestion(hass, 'sensor.temp');
      expect(s.config).toEqual({ type: 'custom:mini-graph-card', entities: [{ entity: 'sensor.temp' }] });
      expect(entry().getEntitySuggestion(hass, 'sensor.energy')).toBeTruthy();
    });

    it('suggests the card for inherently-numeric domains', () => {
      expect(entry().getEntitySuggestion(hass, 'counter.coffee')).toBeTruthy();
    });

    it('returns null for non-numeric or non-graphable entities', () => {
      expect(entry().getEntitySuggestion(hass, 'sensor.text')).toBeNull();
      expect(entry().getEntitySuggestion(hass, 'light.kitchen')).toBeNull();
      expect(entry().getEntitySuggestion(hass, 'sensor.missing')).toBeNull();
    });
  });
});

describe('mini-graph-card — setConfig', () => {
  it('normalizes string entities and builds one Graph per entity', () => {
    const card = make();
    card.setConfig({ entities: ['sensor.a', { entity: 'sensor.b' }] });
    expect(card.config.entities).toEqual([{ entity: 'sensor.a' }, { entity: 'sensor.b' }]);
    expect(card.Graph).toHaveLength(2);
  });

  it('throws for a missing entities list', () => {
    expect(() => make().setConfig({})).toThrow();
  });
});

describe('mini-graph-card — card size', () => {
  it('calculateCardSize accounts for header, state and graph', () => {
    const card = make();
    card.setConfig({ entities: ['sensor.a'] });
    // defaults: name+icon (+1), state (+1), graph 100px (+2), base 1 => 5
    expect(card.calculateCardSize()).toBe(5);
  });
});

describe('mini-graph-card — compute delegation', () => {
  it('computeColor / computeName resolve against the live config & entity', () => {
    const card = make();
    card.setConfig({ entities: ['sensor.a'], line_color: ['#abcdef'] });
    card.entity = [{ attributes: { friendly_name: 'Temp' }, entity_id: 'sensor.a', state: '21' }];
    expect(card.computeColor('21', 0)).toBe('#abcdef');
    expect(card.computeName(0)).toBe('Temp');
  });
});

describe('mini-graph-card — render', () => {
  it('renders a warning when a configured entity is unavailable', async () => {
    const card = make();
    card.setConfig({ entities: ['sensor.missing'] });
    card.hass = { states: {}, language: 'en', locale: { language: 'en' } };
    document.body.appendChild(card);
    await card.updateComplete;
    expect(card.shadowRoot.querySelector('hui-warning')).toBeTruthy();
    card.remove();
  });

  it('renders header, state and graph svg when data is present', async () => {
    const card = make();
    card.setConfig({
      entities: ['sensor.a'],
      show: {
        graph: 'line', name: true, icon: true, state: true,
      },
    });
    const state = {
      entity_id: 'sensor.a',
      state: '21',
      attributes: { friendly_name: 'Temp', unit_of_measurement: '°C' },
    };
    card.entity = [state];
    card._hass = { language: 'en', locale: { language: 'en' }, states: { 'sensor.a': state } };

    // Prime the graph + render arrays so renderGraph() is "ready".
    card.Graph[0].history = [{ state: '21', last_changed: new Date().toISOString() }];
    card.bound = [20, 22];
    card.line = ['M0,50 250,40 500,30'];

    document.body.appendChild(card);
    await card.updateComplete;

    expect(card.shadowRoot.querySelector('.name')).toBeTruthy();
    expect(card.shadowRoot.querySelector('.states')).toBeTruthy();
    expect(card.shadowRoot.querySelector('svg')).toBeTruthy();
    expect(card.shadowRoot.textContent).toContain('Temp');
    card.remove();
  });

  it('renders every svg fragment (fill, line, bars, points, gradient)', async () => {
    const card = make();
    card.setConfig({
      entities: ['sensor.a'],
      color_thresholds: [{ value: 30, color: '#ff0000' }, { value: 10, color: '#0000ff' }],
      show: {
        graph: 'line', fill: true, points: true,
      },
    });
    const state = { entity_id: 'sensor.a', state: '21', attributes: { friendly_name: 'Temp' } };
    card.entity = [state];
    card._hass = { language: 'en', locale: { language: 'en' }, states: { 'sensor.a': state } };
    card.Graph[0].history = [{ state: '21', last_changed: new Date().toISOString() }];
    card.bound = [10, 30];
    card.fill = ['M0,100 250,80 500,60 L 500,100 L 0,100 z'];
    card.line = ['M0,50 250,40 500,30'];
    card.bar = [[{
      x: 0, y: 10, height: 90, width: 20, value: 21,
    }]];
    card.points = [[[0, 50, 21, 0]]];
    card.gradient = [[{ color: '#ff0000', offset: 0 }, { color: '#0000ff', offset: 100 }]];

    document.body.appendChild(card);
    await card.updateComplete;

    const svg = card.shadowRoot.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg.querySelector('linearGradient')).toBeTruthy();
    expect(svg.querySelector('.bar')).toBeTruthy();
    expect(svg.querySelector('.line--point')).toBeTruthy();
    card.remove();
  });
});

describe('mini-graph-card — updateData pipeline (mocked history API)', () => {
  it('fetches history and feeds it into the entity Graph', async () => {
    const card = make();
    card.setConfig({ entities: ['sensor.a'], cache: false, show: { graph: 'line' } });
    const state = { entity_id: 'sensor.a', state: '21', attributes: {} };
    const now = new Date();
    const apiHistory = [[
      { state: '20', last_changed: new Date(now.getTime() - 3600000).toISOString() },
      { state: '22', last_changed: now.toISOString() },
    ]];
    const callApi = vi.fn().mockResolvedValue(apiHistory);
    card._hass = {
      callApi, language: 'en', locale: { language: 'en' }, states: { 'sensor.a': state },
    };
    card.config.entities.forEach((e, i) => { e.index = i; });
    card.entity = [state];
    card.updateQueue = ['sensor.a-0'];

    await card.updateData();

    expect(callApi).toHaveBeenCalledOnce();
    expect(callApi.mock.calls[0][1]).toContain('filter_entity_id=sensor.a');
    expect(card.Graph[0]._history.length).toBeGreaterThan(0);
  });

  it('records extrema (min/avg/max) for the primary entity when configured', async () => {
    const card = make();
    card.setConfig({
      entities: ['sensor.a'], cache: false, show: { graph: 'line', extrema: true, average: true },
    });
    const state = { entity_id: 'sensor.a', state: '21', attributes: {} };
    const apiHistory = [[
      { state: '10', last_changed: new Date(Date.now() - 7200000).toISOString() },
      { state: '30', last_changed: new Date(Date.now() - 3600000).toISOString() },
    ]];
    card._hass = {
      callApi: vi.fn().mockResolvedValue(apiHistory),
      language: 'en',
      locale: { language: 'en' },
      states: { 'sensor.a': state },
    };
    card.config.entities.forEach((e, i) => { e.index = i; });
    card.entity = [state];
    card.updateQueue = ['sensor.a-0'];

    await card.updateData();

    const types = card.abs.map(a => a.type);
    expect(types).toEqual(['min', 'avg', 'max']);
  });
});
