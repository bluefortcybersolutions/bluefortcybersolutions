/**
 * BlueFort Cyber Solutions - Theme Manager
 * Handles light/dark mode toggling and local storage persistence.
 * This script should be loaded in the <head> to prevent flash of unstyled content (FOUC).
 */

(function() {
  const THEME_KEY = 'bluefort_theme';
  
  // Check local storage or system preference
  let currentTheme = localStorage.getItem(THEME_KEY);
  if (!currentTheme) {
    currentTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  // Apply theme immediately
  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  // Expose toggle function globally
  window.toggleTheme = function() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const newTheme = isLight ? 'dark' : 'light';
    
    if (newTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    
    localStorage.setItem(THEME_KEY, newTheme);
  };

  // Bind to toggle button after DOM loads
  window.addEventListener('DOMContentLoaded', () => {
    // There might be multiple toggle buttons (e.g. mobile nav vs desktop nav)
    const themeBtns = document.querySelectorAll('.theme-toggle-btn');
    themeBtns.forEach(btn => {
      btn.addEventListener('click', window.toggleTheme);
    });
  });
})();
