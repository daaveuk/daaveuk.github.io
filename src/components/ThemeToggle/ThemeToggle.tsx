import React, { useState, useEffect } from "react";
import * as styles from "./styles/index.css"; // Adjust the import path as necessary
import { Toggle } from "../Toggle";
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
    const currentTheme = document.documentElement.getAttribute("data-theme");
    setIsDarkMode(currentTheme === "dark");

    // Listen for theme changes
    const handleThemeChange = (event: ThemeChangeEvent) => {
      setIsDarkMode(event.detail.theme === "dark");
    };

    window.addEventListener("themeChange", handleThemeChange as EventListener);

    return () => {
      window.removeEventListener(
        "themeChange",
        handleThemeChange as EventListener
      );
    };
  }, []);

  const handleToggle = () => {
    if (window.toggleTheme) {
      setIsDarkMode((prev) => !prev);
      window.toggleTheme();
    }
  };

  return (
    <div
      className={styles.wrapper}
      role="group"
      aria-labelledby="theme-toggle-label"
    >
      <span id="theme-toggle-label" className="sr-only">
        Theme selector
      </span>
      <div className={styles.toggleContainer}>
        <label className={styles.checkBoxLabel} htmlFor="themeToggle-input">
          <span className="sun-icon" aria-hidden="true">
            ☀️
          </span>
          <span id="theme-toggle-label-light-mode" className="sr-only">
            Switch to dark mode
          </span>
        </label>
        <Toggle
          id={id || "themeToggle"}
          checked={isDarkMode}
          onChange={handleToggle}
          rounded={true}
        />
        <label className={styles.checkBoxLabel} htmlFor="themeToggle-input">
          <span className="moon-icon" aria-hidden="true">
            🌙
          </span>
          <span id="theme-toggle-label-light-mode" className="sr-only ">
            Switch to light mode
          </span>
        </label>
      </div>
    </div>
  );
};

export default ThemeToggle;
