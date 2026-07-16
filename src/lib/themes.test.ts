// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { loadStoredTheme, storeTheme, DEFAULT_THEME } from './themes';

describe('theme persistence', () => {
  beforeEach(() => localStorage.clear());

  it('falls back to the default theme when nothing is stored', () => {
    expect(loadStoredTheme()).toBe(DEFAULT_THEME);
  });

  it('remembers a stored theme', () => {
    storeTheme('aurora');
    expect(loadStoredTheme()).toBe('aurora');
  });

  it('rejects values that are not real themes', () => {
    localStorage.setItem('lukako-theme', 'neon-pink-x99');
    expect(loadStoredTheme()).toBe(DEFAULT_THEME);
  });
});
