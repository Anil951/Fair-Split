import React from 'react';
import './ThemeToggle.css';

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  const toggleTheme = () => {
    const darkModeEnabled = !darkMode;
    document.body.classList.toggle('dark-theme', darkModeEnabled);
    setDarkMode(darkModeEnabled);
  };

  return (
    <div className="theme-toggle" onClick={toggleTheme}>
      {darkMode ? (
        <i className="fas fa-lightbulb"></i>
      ) : (
        <i className="fas fa-moon"></i>
      )}
    </div>
  );
};

export default ThemeToggle;
