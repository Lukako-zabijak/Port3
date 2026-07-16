export type ThemeKey = 'terminal' | 'aurora' | 'ember' | 'frost';

export interface ThemeDef {
  key: ThemeKey;
  label: string;
  accent: string;   // main accent hex
  accent2: string;  // secondary hex used in gradients / particles
  bg: string;
  panel: string;
  blurb: string;
}

export const THEMES: ThemeDef[] = [
  {
    key: 'terminal',
    label: 'Terminal',
    accent: '#34d399',
    accent2: '#0d9488',
    bg: '#0a0a0b',
    panel: '#0e0e11',
    blurb: 'Emerald grid, drifting packets',
  },
  {
    key: 'aurora',
    label: 'Aurora',
    accent: '#818cf8',
    accent2: '#c084fc',
    bg: '#0a0a10',
    panel: '#0e0e16',
    blurb: 'Slow nebula over a night shift',
  },
  {
    key: 'ember',
    label: 'Ember',
    accent: '#fbbf24',
    accent2: '#f97316',
    bg: '#0c0a08',
    panel: '#120e0a',
    blurb: 'Sparks off a late-night build',
  },
  {
    key: 'frost',
    label: 'Frost',
    accent: '#38bdf8',
    accent2: '#22d3ee',
    bg: '#090b0d',
    panel: '#0c1013',
    blurb: 'Cold drift, clean commits',
  },
];

export const DEFAULT_THEME: ThemeKey = 'terminal';
export const THEME_STORAGE_KEY = 'lukako-theme';

export function getTheme(key: ThemeKey): ThemeDef {
  return THEMES.find((t) => t.key === key) ?? THEMES[0];
}

export function applyTheme(def: ThemeDef) {
  const root = document.documentElement;
  root.style.setProperty('--ac', def.accent);
  root.style.setProperty('--ac2', def.accent2);
  root.style.setProperty('--bg', def.bg);
  root.style.setProperty('--panel', def.panel);
  root.dataset.theme = def.key;
}

export function loadStoredTheme(): ThemeKey {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    if (v === 'terminal' || v === 'aurora' || v === 'ember' || v === 'frost') return v;
  } catch {
    /* private mode etc. */
  }
  return DEFAULT_THEME;
}

export function storeTheme(key: ThemeKey) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, key);
  } catch {
    /* ignore */
  }
}
