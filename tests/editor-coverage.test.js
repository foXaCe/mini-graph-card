// @vitest-environment jsdom
import {
  describe, it, expect, vi,
} from 'vitest';
import '../src/editor/editor';

const make = () => document.createElement('mini-graph-card-editor');
const hass = { states: {}, language: 'en', locale: { language: 'en' } };
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

describe('editor — _readValue across HA controls', () => {
  it('parses a number from ha-textfield type=number', () => {
    const el = ready();
    const spy = onChange(el);
    el._valueChanged({ target: { type: 'number', value: '150' } }, 'height');
    expect(spy.mock.calls[0][0].detail.config.height).toBe(150);
  });

  it('reads a boolean from ha-switch (via localName)', () => {
    const el = ready();
    const spy = onChange(el);
    el._valueChanged({ target: { localName: 'ha-switch', checked: false } }, 'animate');
    expect(spy.mock.calls[0][0].detail.config.animate).toBe(false);
  });

  it('reads value-changed detail from pickers', () => {
    const el = ready();
    const spy = onChange(el);
    el._valueChanged({ target: { localName: 'ha-icon-picker' }, detail: { value: 'mdi:flash' } }, 'icon');
    expect(spy.mock.calls[0][0].detail.config.icon).toBe('mdi:flash');
  });
});

describe('editor — _valueChanged no-change guard (ha-select re-fire)', () => {
  it('does not fire config-changed when the value is unchanged', () => {
    const el = ready({ entities: ['sensor.a'], aggregate_func: 'avg' });
    const spy = onChange(el);
    el._valueChanged({ target: { value: 'avg' } }, 'aggregate_func');
    expect(spy).not.toHaveBeenCalled();
  });

  it('fires when the select value actually changes', () => {
    const el = ready({ entities: ['sensor.a'], aggregate_func: 'avg' });
    const spy = onChange(el);
    el._valueChanged({ target: { value: 'max' } }, 'aggregate_func');
    expect(spy.mock.calls[0][0].detail.config.aggregate_func).toBe('max');
  });
});

describe('editor — entity handlers', () => {
  it('_primaryEntityChanged seeds the entities list from a single picker value', () => {
    const el = make();
    el.setConfig({});
    el.hass = hass;
    const spy = onChange(el);
    el._primaryEntityChanged({ target: { localName: 'ha-entity-picker' }, detail: { value: 'sensor.x' } });
    expect(spy.mock.calls[0][0].detail.config.entities).toEqual(['sensor.x']);
  });

  it('_entityListChanged updates a specific entity slot', () => {
    const el = ready({ entities: ['sensor.a', 'sensor.b'] });
    const spy = onChange(el);
    el._entityListChanged({ target: { localName: 'ha-entity-picker' }, detail: { value: 'sensor.c' } }, 1);
    expect(spy.mock.calls[0][0].detail.config.entities[1]).toBe('sensor.c');
  });

  it('_entityConfigChanged reads a boolean from a per-entity ha-switch', () => {
    const el = ready({ entities: ['sensor.a'] });
    const spy = onChange(el);
    el._entityConfigChanged({ target: { localName: 'ha-switch', checked: false } }, 0, 'show_line');
    expect(spy.mock.calls[0][0].detail.config.entities[0].show_line).toBe(false);
  });

  it('_toggleEntityConfig / _isEntityConfigExpanded flip per-entity expansion', () => {
    const el = ready({ entities: ['sensor.a'] });
    expect(el._isEntityConfigExpanded(0)).toBeFalsy();
    el._toggleEntityConfig(0);
    expect(el._isEntityConfigExpanded(0)).toBe(true);
    el._toggleEntityConfig(0);
    expect(el._isEntityConfigExpanded(0)).toBe(false);
  });
});

describe('editor — ha-select mount re-fire guard (M2 regression)', () => {
  it('_selectChanged ignores the mount re-fire (value equals displayed)', () => {
    const el = ready({ entities: ['sensor.a'], align_icon: 'right' });
    const spy = onChange(el);
    el._selectChanged({ target: { value: 'right' } }, 'align_icon', 'right');
    expect(spy).not.toHaveBeenCalled();
  });

  it('_selectChanged fires on a genuine selection change', () => {
    const el = ready({ entities: ['sensor.a'] });
    const spy = onChange(el);
    el._selectChanged({ target: { value: 'left' } }, 'align_icon', 'right');
    expect(spy.mock.calls[0][0].detail.config.align_icon).toBe('left');
  });

  it('_tapActionChanged ignores the action-select mount re-fire', () => {
    const el = ready({ entities: ['sensor.a'] }); // default tap_action = more-info
    const spy = onChange(el);
    el._tapActionChanged({ target: { value: 'more-info' } }, 'action');
    expect(spy).not.toHaveBeenCalled();
  });

  it('_entitySelectChanged ignores the y_axis mount re-fire', () => {
    const el = ready({ entities: ['sensor.a'] });
    const spy = onChange(el);
    el._entitySelectChanged({ target: { value: 'primary' } }, 0, 'y_axis', 'primary');
    expect(spy).not.toHaveBeenCalled();
  });
});

describe('editor — threshold handlers', () => {
  it('_removeThreshold drops the right row', () => {
    const el = ready({
      entities: ['sensor.a'],
      color_thresholds: [{ value: 0, color: '#ff0000' }, { value: 10, color: '#00ff00' }],
    });
    const spy = onChange(el);
    el._removeThreshold(0);
    const thresholds = spy.mock.calls[0][0].detail.config.color_thresholds;
    expect(thresholds).toHaveLength(1);
    expect(thresholds[0].value).toBe(10);
  });
});

describe('editor — full render (sections + expanded entity)', () => {
  it('renders all sections, the per-entity config, thresholds and tap-action', async () => {
    const el = make();
    el.setConfig({
      entities: [{ entity: 'sensor.a', name: 'Temp' }],
      color_thresholds: [{ value: 0, color: '#ff0000' }],
      tap_action: { action: 'navigate', navigation_path: '/x' },
    });
    el.hass = hass;
    el._expandedSections = {
      entities: true, display: true, graph: true, data: true, bounds: true, colors: true, advanced: true,
    };
    el._expandedEntities = [0];
    document.body.appendChild(el);
    await el.updateComplete;

    const root = el.shadowRoot;
    expect(root.querySelector('.card-config')).toBeTruthy();
    expect(root.querySelector('.entity-config-content')).toBeTruthy(); // renderEntityConfig
    expect(root.querySelector('.thresholds-section')).toBeTruthy(); // renderColorsSection
    expect(root.querySelector('.tap-action-section')).toBeTruthy(); // renderAdvancedSection
    el.remove();
  });

  it('renders the loading state when hass is absent', async () => {
    const el = make();
    el.setConfig({ entities: ['sensor.a'] });
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('.loading')).toBeTruthy();
    el.remove();
  });
});

describe('editor — more handlers', () => {
  it('_showChanged updates the show map', () => {
    const el = ready({ entities: ['sensor.a'] });
    const spy = onChange(el);
    el._showChanged({ target: { checked: false } }, 'name');
    expect(spy.mock.calls[0][0].detail.config.show.name).toBe(false);
  });

  it('_addEntity appends an empty slot', () => {
    const el = ready({ entities: ['sensor.a'] });
    const spy = onChange(el);
    el._addEntity();
    expect(spy.mock.calls[0][0].detail.config.entities).toHaveLength(2);
  });

  it('_addThreshold then _thresholdChanged sets a numeric value', () => {
    const el = ready({ entities: ['sensor.a'] });
    const spy = onChange(el);
    el._addThreshold();
    expect(spy.mock.calls[0][0].detail.config.color_thresholds).toHaveLength(1);
    el._thresholdChanged({ target: { value: '15' } }, 0, 'value');
    expect(spy.mock.calls.at(-1)[0].detail.config.color_thresholds[0].value).toBe(15);
  });

  it('_tapActionChanged sets the navigation path', () => {
    const el = ready({ entities: ['sensor.a'] });
    const spy = onChange(el);
    el._tapActionChanged({ target: { value: '/lovelace/0' } }, 'navigation_path');
    expect(spy.mock.calls[0][0].detail.config.tap_action.navigation_path).toBe('/lovelace/0');
  });

  it('_actionChanged sets a hold_action (separate from tap)', () => {
    const el = ready({ entities: ['sensor.a'] });
    const spy = onChange(el);
    el._actionChanged({ target: { value: 'navigate' } }, 'hold_action', 'action');
    expect(spy.mock.calls[0][0].detail.config.hold_action.action).toBe('navigate');
  });

  it('renders three action sub-forms (tap, hold, double-tap)', async () => {
    const el = make();
    el.setConfig({ entities: ['sensor.a'] });
    el.hass = hass;
    el._expandedSections = { advanced: true };
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.querySelectorAll('.tap-action-section')).toHaveLength(3);
    el.remove();
  });

  it('_removeEntity drops the right slot', () => {
    const el = ready({ entities: ['sensor.a', 'sensor.b'] });
    const spy = onChange(el);
    el._removeEntity(0);
    expect(spy.mock.calls[0][0].detail.config.entities).toEqual([{ entity: 'sensor.b' }]);
  });
});

describe('editor — config getters (fallbacks)', () => {
  it('every generated getter resolves without throwing and applies defaults', () => {
    const el = ready({ entities: ['sensor.a'] });
    const keys = [
      'entity', 'entities', 'name', 'icon', 'icon_image', 'unit', 'height', 'line_width',
      'bar_spacing', 'hours_to_show', 'points_per_hour', 'aggregate_func', 'group_by',
      'update_interval', 'hour24', 'min_bound_range', 'logarithmic', 'color_thresholds',
      'color_thresholds_transition', 'font_size', 'font_size_header', 'align_header',
      'align_icon', 'align_state', 'group', 'appearance', 'show', 'tap_action',
      'line_color', 'animate', 'smoothing', 'cache', 'compress', 'lower_bound',
      'upper_bound', 'decimals',
    ];
    const values = keys.map((k) => el[`_${k}`]);
    expect(values).toHaveLength(keys.length);
    // a few default sanity checks
    expect(el._height).toBe(100);
    expect(el._aggregate_func).toBe('avg');
    expect(el._appearance).toBe('premium');
    expect(el._animate).toBe(true);
  });
});
