import React, { useState, useEffect } from 'react';

const ThemeToggle = ({ id }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    <div className="theme-toggle-wrapper">
      <div className="toggle-label">
        <span role="img" aria-label="Sun Emoji">🌞</span>
      </div>
      <div className="toggle-container">
        <input
          id={id}
          type="checkbox"
          className="toggle-checkbox"
          onChange={handleToggle}
          checked={isDarkMode}
        />
        <label htmlFor={id} className="toggle-label-switch" />
      </div>
      <div className="toggle-label">
        <span role="img" aria-label="Moon Emoji">🌙</span>
      </div>
    </div>
  );
};

export { ThemeToggle };
export default ThemeToggle;
