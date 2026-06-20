// @vitest-environment jsdom
import {
  describe, it, expect, vi,
} from 'vitest';
import '../src/editor/editor';

const make = () => document.createElement('mini-graph-card-editor');
const hass = { states: {}, language: 'en', locale: { language: 'en' } };

describe('mini-graph-card-editor — registration', () => {
  it('is a defined custom element', () => {
    expect(customElements.get('mini-graph-card-editor')).toBeTypeOf('function');
  });
});

describe('mini-graph-card-editor — config getters', () => {
  it('returns defaults when no config is set', () => {
    const el = make();
    expect(el._name).toBe('');
    expect(el._height).toBe(100);
    expect(el._aggregate_func).toBe('avg');
    expect(el._animate).toBe(true); // boolean getter, true unless explicit false
    expect(el._cache).toBe(true);
  });

  it('reflects configured values and respects explicit false for booleans', () => {
    const el = make();
    el.setConfig({ entities: ['sensor.a'], name: 'My Card', animate: false });
    expect(el._name).toBe('My Card');
    expect(el._animate).toBe(false);
  });

  it('joins an array line_color into a comma list for the text input', () => {
    const el = make();
    el.setConfig({ entities: ['sensor.a'], line_color: ['#111', '#222'] });
    expect(el._line_color).toBe('#111, #222');
  });
});

describe('mini-graph-card-editor — getEntityInfo', () => {
  it('reads friendly_name and icon from hass state', () => {
    const el = make();
    el.hass = {
      states: { 'sensor.a': { attributes: { friendly_name: 'Alpha', icon: 'mdi:flash' }, state: '1' } },
    };
    const info = el.getEntityInfo('sensor.a');
    expect(info.friendlyName).toBe('Alpha');
    expect(info.icon).toBe('mdi:flash');
    expect(info.domain).toBe('sensor');
  });

  it('falls back gracefully for an unknown entity', () => {
    const el = make();
    el.hass = hass;
    const info = el.getEntityInfo('light.unknown');
    expect(info.friendlyName).toBe('light.unknown');
    expect(info.domain).toBe('light');
  });
});

describe('mini-graph-card-editor — render', () => {
  it('renders the configuration sections once hass is set', async () => {
    const el = make();
    el.setConfig({ entities: ['sensor.a'] });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('.card-config')).toBeTruthy();
    const headers = el.shadowRoot.querySelectorAll('.section');
    expect(headers.length).toBe(7); // entities, display, graph, data, bounds, colors, advanced
    el.remove();
  });

  it('shows the loading state before hass is available', async () => {
    const el = make();
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('.loading')).toBeTruthy();
    el.remove();
  });
});

describe('mini-graph-card-editor — change handlers fire config-changed', () => {
  const ready = (config = { entities: ['sensor.a'] }) => {
    const el = make();
    el.setConfig(config);
    el.hass = hass;
    return el;
  };
  const onChange = (el) => {
    const spy = vi.fn();
    el.addEventListener('config-changed', spy);
    return spy;
  };

  it('_valueChanged updates a text field', () => {
    const el = ready();
    const spy = onChange(el);
    el._valueChanged({ target: { type: 'text', value: 'My Card' } }, 'name');
    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0].detail.config.name).toBe('My Card');
  });

  it('_valueChanged splits a comma list into an array for line_color', () => {
    const el = ready();
    const spy = onChange(el);
    el._valueChanged({ target: { type: 'text', value: '#111, #222' } }, 'line_color');
    expect(spy.mock.calls[0][0].detail.config.line_color).toEqual(['#111', '#222']);
  });

  it('_showChanged toggles a show.* flag', () => {
    const el = ready();
    const spy = onChange(el);
    el._showChanged({ target: { checked: false } }, 'legend');
    expect(spy.mock.calls[0][0].detail.config.show.legend).toBe(false);
  });

  it('_addEntity / _removeEntity mutate the entities list', () => {
    const el = ready({ entities: ['sensor.a'] });
    const spy = onChange(el);
    el._addEntity();
    expect(spy.mock.calls[0][0].detail.config.entities).toHaveLength(2);
    el._removeEntity(0);
    expect(spy.mock.calls[1][0].detail.config.entities).toHaveLength(1);
  });

  it('_addThreshold / _thresholdChanged manage color thresholds', () => {
    const el = ready();
    const spy = onChange(el);
    el._addThreshold();
    expect(spy.mock.calls[0][0].detail.config.color_thresholds).toHaveLength(1);
    el._thresholdChanged({ target: { value: '42' } }, 0, 'value');
    expect(spy.mock.calls[1][0].detail.config.color_thresholds[0].value).toBe(42);
  });

  it('_tapActionChanged updates the tap action', () => {
    const el = ready();
    const spy = onChange(el);
    el._tapActionChanged({ target: { value: 'navigate' } }, 'action');
    expect(spy.mock.calls[0][0].detail.config.tap_action.action).toBe('navigate');
  });

  it('_entityConfigChanged sets a per-entity option', () => {
    const el = ready({ entities: ['sensor.a'] });
    const spy = onChange(el);
    el._entityConfigChanged({ target: { type: 'text', value: 'Alias' } }, 0, 'name');
    expect(spy.mock.calls[0][0].detail.config.entities[0].name).toBe('Alias');
  });

  it('_toggleSection flips section expansion state', () => {
    const el = ready();
    const before = el._expandedSections.display;
    el._toggleSection('display');
    expect(el._expandedSections.display).toBe(!before);
  });
});
