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
    const handleThemeChange = (event) => {
      setIsDarkMode(event.detail.theme === 'dark');
    };

    window.addEventListener('themeChange', handleThemeChange);

    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
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
        Theme selection: {isDarkMode ? 'Dark mode' : 'Light mode'}
      </span>
      <div className="toggle-label" aria-hidden="true">
        <span role="img" aria-label="Sun Emoji">🌞</span>
      </div>
      <div className="toggle-container">
        <input
          id={id}
          type="checkbox"
          className="toggle-checkbox"
          onChange={handleToggle}
          checked={isDarkMode}
          aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          aria-describedby="theme-toggle-description"
        />
        <label htmlFor={id} className="toggle-label-switch" />
      </div>
      <div className="toggle-label" aria-hidden="true">
        <span role="img" aria-label="Moon Emoji">🌙</span>
      </div>
      <span id="theme-toggle-description" className="sr-only">
        Toggle between light and dark theme
      </span>
    </div>
  );
};

export { ThemeToggle };
export default ThemeToggle;
