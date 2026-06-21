import localForage from 'localforage';
import { compress, decompress } from './utils';
import type { HistoryItem, HomeAssistant } from './types';

// Data access layer extracted from MiniGraphCard: the Home Assistant history
// API and the localForage history cache. The cache `store` is injectable so the
// (de)compression and key logic can be unit tested without IndexedDB.

// A compact history row from the WebSocket `history/history_during_period`
// command: `s`=state, `lu`=last_updated, `lc`=last_changed (both unix seconds),
// `a`=attributes. With minimal_response, follow-up rows omit `lc`/`a`.
interface WsHistoryRow {
  s: string | number;
  lu: number;
  lc?: number;
  a?: Record<string, unknown>;
}

// Fetch recent history. Prefers the modern WebSocket API
// (`history/history_during_period`); falls back to the legacy REST endpoint
// (`history/period`) on older Home Assistant or if the WS command is
// unavailable/errors. The return shape is identical for both paths.
export async function fetchRecent(
  hass: HomeAssistant,
  entityId: string,
  start: Date | undefined,
  end: Date | undefined,
  skipInitialState: boolean,
  withAttributes: boolean,
): Promise<HistoryItem[][]> {
  if (typeof hass.callWS === 'function') {
    try {
      return await fetchRecentWs(hass, entityId, start, end, skipInitialState, withAttributes);
    } catch {
      // WS command missing/unsupported → fall back to REST below.
    }
  }
  return fetchRecentRest(hass, entityId, start, end, skipInitialState, withAttributes);
}

async function fetchRecentWs(
  hass: HomeAssistant,
  entityId: string,
  start: Date | undefined,
  end: Date | undefined,
  skipInitialState: boolean,
  withAttributes: boolean,
): Promise<HistoryItem[][]> {
  const msg: { type: string; [key: string]: unknown } = {
    type: 'history/history_during_period',
    start_time: (start ?? new Date(0)).toISOString(),
    entity_ids: [entityId],
    minimal_response: !withAttributes,
    no_attributes: !withAttributes,
    significant_changes_only: !withAttributes,
  };
  if (end) msg.end_time = end.toISOString();

  const result = await hass.callWS<Record<string, WsHistoryRow[]>>(msg);
  let rows = (result && result[entityId]) || [];
  // The REST path honoured `skip_initial_state`; the WS command has no such
  // flag, so emulate it by dropping the synthesised first row.
  if (skipInitialState && rows.length > 0) rows = rows.slice(1);

  return [rows.map((r) => ({
    state: r.s,
    last_changed: new Date((r.lc ?? r.lu) * 1000).toISOString(),
    last_updated: new Date(r.lu * 1000).toISOString(),
    ...(r.a ? { attributes: r.a } : {}),
  }))];
}

function fetchRecentRest(
  hass: HomeAssistant,
  entityId: string,
  start: Date | undefined,
  end: Date | undefined,
  skipInitialState: boolean,
  withAttributes: boolean,
): Promise<HistoryItem[][]> {
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
export function cacheKey(md5Config: string, key: string, compressed: boolean): string {
  return `${key}_${md5Config}${compressed ? '' : '_raw'}`;
}

export async function getCache(
  md5Config: string,
  key: string,
  compressed: boolean,
  store: LocalForage = localForage,
): Promise<unknown> {
  const data = await store.getItem(cacheKey(md5Config, key, compressed));
  return data ? (compressed ? decompress(data) : data) : null;
}

export async function setCache(
  md5Config: string,
  key: string,
  data: unknown,
  compressed: boolean,
  store: LocalForage = localForage,
): Promise<unknown> {
  return compressed
    ? store.setItem(cacheKey(md5Config, key, true), compress(data))
    : store.setItem(cacheKey(md5Config, key, false), data);
}
