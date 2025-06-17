import { describe, it, expect, beforeEach, vi } from 'vitest';

// Theme utility functions that match the inline script in Layout.astro
const getInitialTheme = () => {
  const localTheme = localStorage.getItem('theme');
  if (localTheme) {
    return localTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const applyTheme = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);

  // Dispatch custom event for theme change
  window.dispatchEvent(
    new CustomEvent('themeChange', { detail: { theme: newTheme } })
  );

  return newTheme;
};

describe('Theme utilities', () => {
  beforeEach(() => {
    // Reset DOM and localStorage
    document.documentElement.removeAttribute('data-theme');
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('getInitialTheme', () => {
    it('returns stored theme from localStorage when available', () => {
      localStorage.setItem('theme', 'dark');

      const theme = getInitialTheme();

      expect(theme).toBe('dark');
    });

    it('returns light theme when no stored theme and prefers light', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(() => ({
          matches: false, // prefers light
        })),
      });

      const theme = getInitialTheme();

      expect(theme).toBe('light');
    });

    it('returns dark theme when no stored theme and prefers dark', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(() => ({
          matches: true, // prefers dark
        })),
      });

      const theme = getInitialTheme();

      expect(theme).toBe('dark');
    });
  });

  describe('applyTheme', () => {
    it('sets data-theme attribute on document element', () => {
      applyTheme('dark');

      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('stores theme in localStorage', () => {
      applyTheme('light');

      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
    });
  });

  describe('toggleTheme', () => {
    it('toggles from light to dark', () => {
      document.documentElement.setAttribute('data-theme', 'light');

      const newTheme = toggleTheme();

      expect(newTheme).toBe('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('toggles from dark to light', () => {
      document.documentElement.setAttribute('data-theme', 'dark');

      const newTheme = toggleTheme();

      expect(newTheme).toBe('light');
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    it('defaults to dark when no current theme set', () => {
      const newTheme = toggleTheme();

      expect(newTheme).toBe('dark');
    });

    it('dispatches themeChange event', () => {
      const eventSpy = vi.spyOn(window, 'dispatchEvent');
      document.documentElement.setAttribute('data-theme', 'light');

      toggleTheme();

      expect(eventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'themeChange',
          detail: { theme: 'dark' },
        })
      );
    });
  });
});
