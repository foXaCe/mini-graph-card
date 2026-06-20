import type { HomeAssistant } from 'custom-card-helpers';
import type { ActionConfig, MiniGraphCardConfig } from './types';

export default (
  node: HTMLElement,
  hass: HomeAssistant,
  _config: MiniGraphCardConfig,
  actionConfig: ActionConfig,
  entityId: string,
): void => {
  switch (actionConfig.action) {
    case 'more-info': {
      node.dispatchEvent(new CustomEvent('hass-more-info', {
        composed: true,
        detail: { entityId },
      }));
      break;
    }
    case 'navigate': {
      if (!actionConfig.navigation_path) return;
      window.history.pushState(null, '', actionConfig.navigation_path);
      window.dispatchEvent(new CustomEvent('location-changed', {
        composed: true,
        detail: { replace: false },
      }));
      break;
    }
    case 'call-service': {
      if (!actionConfig.service) return;
      const [domain, service] = actionConfig.service.split('.', 2);
      const serviceData = { ...actionConfig.service_data };
      hass.callService(domain, service, serviceData);
      break;
    }
    case 'url': {
      if (!actionConfig.url) return;
      window.location.href = actionConfig.url;
      break;
    }
    case 'fire-dom-event': {
      node.dispatchEvent(new CustomEvent('ll-custom', {
        composed: true,
        bubbles: true,
        detail: actionConfig,
      }));
      break;
    }
    default:
      break;
  }
};
