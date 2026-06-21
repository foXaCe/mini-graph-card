// Conventional i18n for mini-graph-card, shared by the card and its visual editor.
// Translations live in ./translations/<lang>.json as nested objects; keys are
// hierarchical dotted paths (e.g. 'editor.labels.card_name'). Home Assistant is
// the source of truth for the active language.
import type { HomeAssistant } from './types';
import en from './translations/en.json';
import fr from './translations/fr.json';
import es from './translations/es.json';

type TranslationDict = { [key: string]: string | TranslationDict };

const LANGUAGES: Record<string, TranslationDict> = { en, fr, es };
const DEFAULT_LANG = 'en';

// Resolve the active language code from the Home Assistant object, falling back
// to the browser and finally English. Normalizes 'fr-FR' -> 'fr'.
export function resolveLang(hass?: HomeAssistant | null): string {
  let raw: string = DEFAULT_LANG;
  if (hass && hass.locale && hass.locale.language) raw = hass.locale.language;
  else if (hass && (hass as { language?: string }).language) raw = (hass as { language: string }).language;
  else if (typeof navigator !== 'undefined' && navigator.language) raw = navigator.language;
  const lang = String(raw).toLowerCase().split('-')[0];
  return LANGUAGES[lang] ? lang : DEFAULT_LANG;
}

function lookup(dict: TranslationDict, key: string): string | TranslationDict | undefined {
  return key.split('.').reduce<string | TranslationDict | undefined>(
    (o, part) => (o && typeof o !== 'string' && o[part] !== undefined ? o[part] : undefined),
    dict,
  );
}

// Translate a hierarchical key for the given hass. Falls back to English, then
// to the key itself. Optional params interpolate {placeholders} in the result.
export function localize(
  key: string,
  hass?: HomeAssistant | null,
  params?: Record<string, unknown>,
): string {
  const lang = resolveLang(hass);
  let result = lookup(LANGUAGES[lang], key);
  if (result === undefined) result = lookup(LANGUAGES[DEFAULT_LANG], key);
  // Guard against a missing key OR a key pointing at an intermediate node
  // (an object): never leak a non-string into a template.
  if (result === undefined || typeof result !== 'string') return key;
  if (params) {
    // Literal split/join — no RegExp, so param names and $-patterns in values
    // are never interpreted specially.
    Object.keys(params).forEach((p) => {
      result = (result as string).split(`{${p}}`).join(String(params[p]));
    });
  }
  return result;
}

export default localize;
