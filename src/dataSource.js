import localForage from 'localforage/src/localforage';
import { compress, decompress } from './utils';

// Data access layer extracted from MiniGraphCard: the Home Assistant history
// API and the localForage history cache. The cache `store` is injectable so the
// (de)compression and key logic can be unit tested without IndexedDB.

export async function fetchRecent(hass, entityId, start, end, skipInitialState, withAttributes) {
  let url = 'history/period';
  if (start) url += `/${start.toISOString()}`;
  url += `?filter_entity_id=${entityId}`;
  if (end) url += `&end_time=${end.toISOString()}`;
  if (skipInitialState) url += '&skip_initial_state';
  if (!withAttributes) url += '&minimal_response&no_attributes';
  if (withAttributes) url += '&significant_changes_only=0';
  return hass.callApi('GET', url);
}

// Compressed entries are stored under `${key}_${md5}`; raw (uncompressed)
// entries get a `_raw` suffix so the two never collide.
export function cacheKey(md5Config, key, compressed) {
  return `${key}_${md5Config}${compressed ? '' : '_raw'}`;
}

export async function getCache(md5Config, key, compressed, store = localForage) {
  const data = await store.getItem(cacheKey(md5Config, key, compressed));
  return data ? (compressed ? decompress(data) : data) : null;
}

export async function setCache(md5Config, key, data, compressed, store = localForage) {
  return compressed
    ? store.setItem(cacheKey(md5Config, key, true), compress(data))
    : store.setItem(cacheKey(md5Config, key, false), data);
}
