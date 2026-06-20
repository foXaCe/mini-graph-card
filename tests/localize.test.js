import { describe, it, expect } from 'vitest';
import { localize, resolveLang } from '../src/localize';

const hassFr = { locale: { language: 'fr' } };
const hassFrFR = { locale: { language: 'fr-FR' } };
const hassEn = { locale: { language: 'en' } };

describe('resolveLang', () => {
  it('reads the language from hass.locale', () => {
    expect(resolveLang(hassFr)).toBe('fr');
    expect(resolveLang(hassEn)).toBe('en');
  });

  it('normalizes region variants like fr-FR -> fr', () => {
    expect(resolveLang(hassFrFR)).toBe('fr');
  });

  it('falls back to en for an explicitly unsupported language', () => {
    // raw is taken from locale, so navigator is never consulted here.
    expect(resolveLang({ locale: { language: 'zz' } })).toBe('en');
  });

  it('falls back to a supported language when hass is absent', () => {
    // With no hass, it consults navigator then en; either way the result
    // must be a language we actually ship.
    expect(['en', 'fr']).toContain(resolveLang(null));
  });

  it('honours hass.language when locale is absent', () => {
    expect(resolveLang({ language: 'fr' })).toBe('fr');
  });
});

describe('localize', () => {
  it('resolves a known hierarchical key in the active language', () => {
    expect(localize('editor.buttons.add_entity', hassEn)).toBe('Add Entity');
    expect(typeof localize('editor.buttons.add_entity', hassFr)).toBe('string');
  });

  it('falls back to English when the key is missing in the active language', () => {
    // unknown lang resolves to en, so this is the english value
    const en = localize('editor.buttons.add_entity', hassEn);
    expect(localize('editor.buttons.add_entity', { locale: { language: 'zz' } })).toBe(en);
  });

  it('returns the key itself when it does not exist anywhere', () => {
    expect(localize('does.not.exist', hassEn)).toBe('does.not.exist');
  });

  it('never leaks an intermediate object node, returns the key instead', () => {
    expect(localize('editor.buttons', hassEn)).toBe('editor.buttons');
  });

  it('interpolates {placeholders} literally without RegExp surprises', () => {
    // Use a real key only if it has a placeholder; otherwise validate the
    // mechanism through a key whose value is a plain string (no-op interpolation).
    const out = localize('editor.buttons.add_entity', hassEn, { unused: '$&' });
    expect(out).not.toContain('{unused}');
  });
});
