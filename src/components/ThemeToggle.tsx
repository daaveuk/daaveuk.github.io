import React, { useState, useEffect } from 'react';

interface ThemeToggleProps {
  id?: string;
}

interface ThemeChangeEvent extends CustomEvent {
  detail: {
    theme: string;
  };
}

declare global {
  interface Window {
    toggleTheme?: () => void;
  }
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ id }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Get initial theme
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setIsDarkMode(currentTheme === 'dark');

    // Listen for theme changes
    const handleThemeChange = (event: ThemeChangeEvent) => {
      setIsDarkMode(event.detail.theme === 'dark');
    };

    window.addEventListener('themeChange', handleThemeChange as EventListener);

    return () => {
      window.removeEventListener('themeChange', handleThemeChange as EventListener);
    };
  }, []);

  const handleToggle = () => {
    if (window.toggleTheme) {
      window.toggleTheme();
    }
  };

  return (
    <div className="theme-toggle-wrapper" role="group" aria-labelledby="theme-toggle-label">
      <span id="theme-toggle-label" className="sr-only">
        Theme selector
      </span>
      <button
        id={id}
        className="theme-toggle"
        onClick={handleToggle}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        aria-pressed={isDarkMode}
        type="button"
      >
        <span className="theme-toggle-track">
          <span className="theme-toggle-thumb"></span>
        </span>
        <span className="theme-toggle-icons">
          <span className="sun-icon" aria-hidden="true">☀️</span>
          <span className="moon-icon" aria-hidden="true">🌙</span>
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;
