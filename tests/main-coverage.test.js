// @vitest-environment jsdom
import {
  describe, it, expect, vi,
} from 'vitest';
import '../src/main';

const make = () => document.createElement('mini-graph-card');
const hass = (states = {}) => ({ language: 'en', locale: { language: 'en' }, states });

// Build a card with a normalised config and a hass, without rendering.
const ready = (config) => {
  const card = make();
  card.setConfig(config);
  card._hass = hass();
  return card;
};

describe('mini-graph-card — getEntityState', () => {
  it('reads the raw entity state by default', () => {
    const card = ready({ entities: ['sensor.a'] });
    card.entity = [{ entity_id: 'sensor.a', state: '42', attributes: {} }];
    expect(card.getEntityState(0)).toBe('42');
  });

  it('reads an attribute when entity.attribute is set', () => {
    const card = ready({ entities: [{ entity: 'sensor.a', attribute: 'temperature' }] });
    card.entity = [{ entity_id: 'sensor.a', state: 'on', attributes: { temperature: 21 } }];
    expect(card.getEntityState(0)).toBe(21);
  });

  it('reads a nested attribute path', () => {
    const card = ready({ entities: [{ entity: 'sensor.a', attribute: 'a.b' }] });
    card.entity = [{ entity_id: 'sensor.a', state: 'x', attributes: { a: { b: 7 } } }];
    expect(card.getEntityState(0)).toBe(7);
  });

  it('reads the last graph point when show.state is "last"', () => {
    const card = ready({ entities: ['sensor.a'], show: { state: 'last' } });
    card.entity = [{ entity_id: 'sensor.a', state: '42', attributes: {} }];
    card.points = [[[0, 10, 99, 0]]]; // [x, y, V=99, i]
    expect(card.getEntityState(0)).toBe(99);
  });
});

describe('mini-graph-card — _convertState (state_map)', () => {
  it('maps a state string to its index', () => {
    const card = ready({
      entities: ['sensor.a'],
      state_map: [{ value: 'home', label: 'Home' }, { value: 'away', label: 'Away' }],
    });
    const res = { state: 'away' };
    card._convertState(res);
    expect(res.state).toBe(1);
  });

  it('leaves an unmapped state untouched', () => {
    const card = ready({ entities: ['sensor.a'], state_map: [{ value: 'home', label: 'Home' }] });
    const res = { state: 'unknown' };
    card._convertState(res);
    expect(res.state).toBe('unknown');
  });
});

describe('mini-graph-card — getEndDate', () => {
  it('rolls to next-day midnight for group_by "date"', () => {
    const card = ready({ entities: ['sensor.a'], group_by: 'date' });
    const d = card.getEndDate();
    expect(d.getHours()).toBe(0);
    expect(d.getMinutes()).toBe(0);
    expect(d.getSeconds()).toBe(0);
  });

  it('rolls to the next whole hour for group_by "hour"', () => {
    const card = ready({ entities: ['sensor.a'], group_by: 'hour' });
    const d = card.getEndDate();
    expect(d.getMinutes()).toBe(0);
    expect(d.getSeconds()).toBe(0);
  });

  it('returns now for the default interval grouping', () => {
    const card = ready({ entities: ['sensor.a'] });
    const d = card.getEndDate();
    expect(d).toBeInstanceOf(Date);
  });
});

describe('mini-graph-card — computeLegend', () => {
  it('appends the state and unit when show_legend_state is on', () => {
    const card = ready({ entities: [{ entity: 'sensor.a', show_legend_state: true }], unit: '°C' });
    card.entity = [{ entity_id: 'sensor.a', state: '21', attributes: { friendly_name: 'Temp' } }];
    const legend = card.computeLegend(0);
    expect(legend).toContain('Temp');
    expect(legend).toContain('21');
    expect(legend).toContain('°C');
  });

  it('shows only the name without show_legend_state', () => {
    const card = ready({ entities: ['sensor.a'] });
    card.entity = [{ entity_id: 'sensor.a', state: '21', attributes: { friendly_name: 'Temp' } }];
    expect(card.computeLegend(0)).toBe('Temp');
  });
});

describe('mini-graph-card — calculateCardSize', () => {
  it('adds a row for the legend (>1 visible) and the info section', () => {
    const card = ready({
      entities: ['sensor.a', 'sensor.b'],
      show: {
        name: true, icon: true, state: true, graph: 'line', legend: true,
      },
    });
    card.abs = [{ type: 'avg', state: 1 }];
    // base 1 + header 1 + state 1 + graph ceil(100/50)=2 + legend 1 + info 1 = 7
    expect(card.calculateCardSize()).toBe(7);
  });
});

describe('mini-graph-card — updateData branches', () => {
  const primeHass = (card, apiHistory, states) => {
    card._hass = {
      callApi: vi.fn().mockResolvedValue(apiHistory),
      language: 'en',
      locale: { language: 'en' },
      states,
    };
    card.config.entities.forEach((e, i) => { e.index = i; });
  };

  it('converts states through state_map during update', async () => {
    const card = make();
    card.setConfig({
      entities: ['sensor.a'],
      cache: false,
      state_map: [{ value: 'low', label: 'Low' }, { value: 'high', label: 'High' }],
      show: { graph: 'line' },
    });
    const state = { entity_id: 'sensor.a', state: 'high', attributes: {} };
    const apiHistory = [[
      { state: 'low', last_changed: new Date(Date.now() - 3600000).toISOString() },
      { state: 'high', last_changed: new Date().toISOString() },
    ]];
    primeHass(card, apiHistory, { 'sensor.a': state });
    card.entity = [state];
    card.updateQueue = ['sensor.a-0'];

    await card.updateData();
    // states were mapped to their indices (0 and 1), both numeric
    expect(card.Graph[0]._history.every((h) => typeof h.state === 'number')).toBe(true);
  });

  it('pins the graph to a single value when fixed_value is set', async () => {
    const card = make();
    card.setConfig({
      entities: [{ entity: 'sensor.a', fixed_value: true }],
      cache: false,
      show: { graph: 'line' },
    });
    const state = { entity_id: 'sensor.a', state: '21', attributes: {} };
    const apiHistory = [[
      { state: '18', last_changed: new Date(Date.now() - 3600000).toISOString() },
      { state: '21', last_changed: new Date().toISOString() },
    ]];
    primeHass(card, apiHistory, { 'sensor.a': state });
    card.entity = [state];
    card.updateQueue = ['sensor.a-0'];

    await card.updateData();
    // fixed_value => history is [last, last]
    expect(card.Graph[0]._history).toHaveLength(2);
    expect(card.Graph[0]._history[0]).toEqual(card.Graph[0]._history[1]);
  });
});

describe('mini-graph-card — card size fallback', () => {
  it('getCardSize falls back to the calculated size when no DOM measurement', () => {
    const card = ready({ entities: ['sensor.a'] });
    // not appended → no ha-card to measure → returns card_size || calculateCardSize
    expect(card.getCardSize()).toBeGreaterThanOrEqual(1);
  });

  it('getCardSize honours an explicit card_size', () => {
    const card = ready({ entities: ['sensor.a'], card_size: 9 });
    expect(card.getCardSize()).toBe(9);
  });

  it('calculateCardSize is 1 for a bare card (everything off)', () => {
    const card = ready({
      entities: ['sensor.a'],
      show: {
        name: false, icon: false, state: false, graph: false, legend: false,
      },
    });
    expect(card.calculateCardSize()).toBe(1);
  });
});

describe('mini-graph-card — refresh scheduling', () => {
  it('setNextUpdate schedules a points-per-hour interval (no update_interval)', () => {
    vi.useFakeTimers();
    const card = ready({ entities: ['sensor.a'] });
    card.setNextUpdate();
    expect(card.interval).toBeDefined();
    clearInterval(card.interval);
    vi.useRealTimers();
  });

  it('updateOnInterval refreshes only when state changed and not updating', () => {
    const card = ready({ entities: ['sensor.a'] });
    const spy = vi.spyOn(card, 'updateData').mockResolvedValue();
    card.updating = false;
    card.stateChanged = false;
    card.updateOnInterval();
    expect(spy).not.toHaveBeenCalled();
    card.stateChanged = true;
    card.updateOnInterval();
    expect(spy).toHaveBeenCalledOnce();
  });
});
