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
