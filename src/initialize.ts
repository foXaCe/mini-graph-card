import localForage from 'localforage';
import { decompress } from './utils';
import { version } from '../package.json';

// Module side-effects: configure the cache store, purge stale entries, and
// print the version banner. Imported once by main.ts.

interface CacheEntry {
  hours_to_show: number;
  last_fetched: string;
  version?: string;
}

localForage.config({
  name: 'mini-graph-card',
  version: 1.0,
  storeName: 'entity_history_cache',
  description: 'Mini graph card uses caching for the entity history',
});

localForage.iterate<unknown, void>((data, key) => {
  const value = (key.endsWith('-raw') ? data : decompress(data)) as CacheEntry;
  const start = new Date();
  start.setHours(start.getHours() - value.hours_to_show);
  if ((data as CacheEntry).version !== version || new Date(value.last_fetched) < start) {
    localForage.removeItem(key);
  }
}).catch((err) => {
   
  console.warn('Purging has errored: ', err);
});

 
console.info(
  `%c MINI-GRAPH-CARD %c ${version} `,
  'color: white; background: coral; font-weight: 700;',
  'color: coral; background: white; font-weight: 700;',
);
