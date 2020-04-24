import { useEffect, useState } from 'react';

export const useDarkMode = () => {
  const localTheme = window.localStorage.getItem('theme');
  const [theme, setTheme] = useState(localTheme || 'light');
  const [componentMounted, setComponentMounted] = useState(false);
  const setMode = mode => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    const themeType =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'light'
        : 'dark';

    setTheme(themeType);
    setComponentMounted(true);
  }, []);

  return [theme, toggleTheme, componentMounted];
};
