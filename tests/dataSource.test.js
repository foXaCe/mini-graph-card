// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import {
  fetchRecent, cacheKey, getCache, setCache,
} from '../src/dataSource';

// Minimal in-memory stand-in for the localForage store.
const makeStore = () => {
  const m = new Map();
  return {
    getItem: async key => (m.has(key) ? m.get(key) : null),
    setItem: async (key, val) => { m.set(key, val); return val; },
    _map: m,
  };
};

describe('cacheKey', () => {
  it('appends _raw only for uncompressed entries', () => {
    expect(cacheKey('md5', 'sensor.x_0', true)).toBe('sensor.x_0_md5');
    expect(cacheKey('md5', 'sensor.x_0', false)).toBe('sensor.x_0_md5_raw');
  });
});

describe('getCache / setCache round-trip', () => {
  it('persists and restores compressed data', async () => {
    const store = makeStore();
    const data = { hours_to_show: 24, data: [{ state: '1' }] };
    await setCache('md5', 'k', data, true, store);
    expect(await getCache('md5', 'k', true, store)).toEqual(data);
    // stored under the compressed (no _raw) key, as a compressed string
    expect(typeof store._map.get('k_md5')).toBe('string');
  });

  it('persists and restores raw data', async () => {
    const store = makeStore();
    const data = { hours_to_show: 12, data: [] };
    await setCache('md5', 'k', data, false, store);
    expect(await getCache('md5', 'k', false, store)).toEqual(data);
    expect(store._map.has('k_md5_raw')).toBe(true);
  });

  it('returns null on a miss', async () => {
    expect(await getCache('md5', 'absent', true, makeStore())).toBeNull();
  });
});

describe('fetchRecent', () => {
  it('builds the history URL and delegates to hass.callApi', async () => {
    const calls = [];
    const hass = { callApi: (method, url) => { calls.push({ method, url }); return ['ok']; } };
    const start = new Date('2026-01-01T00:00:00.000Z');
    const end = new Date('2026-01-02T00:00:00.000Z');

    await fetchRecent(hass, 'sensor.x', start, end, true, false);

    expect(calls).toHaveLength(1);
    expect(calls[0].method).toBe('GET');
    const { url } = calls[0];
    expect(url).toContain('history/period/2026-01-01T00:00:00.000Z');
    expect(url).toContain('filter_entity_id=sensor.x');
    expect(url).toContain('end_time=2026-01-02T00:00:00.000Z');
    expect(url).toContain('skip_initial_state');
    expect(url).toContain('minimal_response&no_attributes');
  });

  it('requests attributes (significant_changes_only=0) when withAttributes', async () => {
    let captured = '';
    const hass = { callApi: (m, url) => { captured = url; return []; } };
    await fetchRecent(hass, 'sensor.x', null, null, false, true);
    expect(captured).toContain('significant_changes_only=0');
    expect(captured).not.toContain('no_attributes');
  });
});
