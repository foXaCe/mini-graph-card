// Pure entity-metadata helpers for the visual editor. Kept free of `this`/DOM
// so they can be unit tested directly.
import type { HomeAssistant } from '../types';

export interface EntityInfo {
  entityId: string;
  friendlyName: string;
  icon: string;
  domain: string;
  state?: string;
}

const DEFAULT_ICONS: Record<string, string> = {
  sensor: 'mdi:gauge',
  binary_sensor: 'mdi:radiobox-blank',
  switch: 'mdi:toggle-switch',
  light: 'mdi:lightbulb',
  climate: 'mdi:thermostat',
  cover: 'mdi:window-shutter',
  fan: 'mdi:fan',
  lock: 'mdi:lock',
  camera: 'mdi:camera',
  media_player: 'mdi:cast',
  device_tracker: 'mdi:account',
  sun: 'mdi:white-balance-sunny',
  weather: 'mdi:weather-partly-cloudy',
};

export function getDefaultIcon(entityId: string): string {
  const domain = entityId.split('.')[0];
  return DEFAULT_ICONS[domain] || 'mdi:help-circle';
}

export function getEntityInfo(hass: HomeAssistant | undefined | null, entityId: string): EntityInfo {
  const domain = entityId.split('.')[0] || 'unknown';

  if (!hass || !hass.states) {
    return {
      entityId, friendlyName: entityId, icon: 'mdi:help-circle', domain,
    };
  }

  const entityState = hass.states[entityId];
  if (!entityState) {
    return {
      entityId, friendlyName: entityId, icon: 'mdi:help-circle-outline', domain,
    };
  }

  return {
    entityId,
    friendlyName: entityState.attributes.friendly_name || entityId,
    icon: entityState.attributes.icon || getDefaultIcon(entityId),
    domain,
    state: entityState.state,
  };
}
