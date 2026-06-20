// @vitest-environment jsdom
import {
  describe, it, expect, vi,
} from 'vitest';
import handleClick from '../src/handleClick';

describe('handleClick', () => {
  it('more-info dispatches a hass-more-info event carrying the entity id', () => {
    const node = document.createElement('div');
    const spy = vi.fn();
    node.addEventListener('hass-more-info', spy);
    handleClick(node, {}, {}, { action: 'more-info' }, 'sensor.a');
    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0].detail).toEqual({ entityId: 'sensor.a' });
  });

  it('navigate pushes history and fires location-changed', () => {
    const spy = vi.fn();
    window.addEventListener('location-changed', spy);
    handleClick(document.createElement('div'), {}, {}, { action: 'navigate', navigation_path: '/lovelace/0' }, 'sensor.a');
    expect(window.location.pathname).toBe('/lovelace/0');
    expect(spy).toHaveBeenCalledOnce();
    window.removeEventListener('location-changed', spy);
  });

  it('navigate without a path does nothing', () => {
    const spy = vi.fn();
    window.addEventListener('location-changed', spy);
    handleClick(document.createElement('div'), {}, {}, { action: 'navigate' }, 'sensor.a');
    expect(spy).not.toHaveBeenCalled();
    window.removeEventListener('location-changed', spy);
  });

  it('call-service splits the service and forwards data to hass', () => {
    const callService = vi.fn();
    handleClick(
      document.createElement('div'),
      { callService },
      {},
      { action: 'call-service', service: 'light.toggle', service_data: { entity_id: 'light.x' } },
      'sensor.a',
    );
    expect(callService).toHaveBeenCalledWith('light', 'toggle', { entity_id: 'light.x' });
  });

  it('fire-dom-event dispatches a bubbling ll-custom event with the config', () => {
    const node = document.createElement('div');
    const spy = vi.fn();
    node.addEventListener('ll-custom', spy);
    const cfg = { action: 'fire-dom-event', foo: 'bar' };
    handleClick(node, {}, {}, cfg, 'sensor.a');
    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0].detail).toBe(cfg);
  });

  it('does nothing for an unknown action', () => {
    expect(() => handleClick(document.createElement('div'), {}, {}, { action: 'nope' }, 'x')).not.toThrow();
  });
});
