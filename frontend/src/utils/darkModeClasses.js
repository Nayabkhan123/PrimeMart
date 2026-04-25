// Common dark mode class combinations for consistency across the app

export const darkModeClasses = {
  // Backgrounds
  bgPrimary: 'bg-white dark:bg-dark-bg',
  bgCard: 'bg-white dark:bg-dark-card',
  bgSecondary: 'bg-gray-50 dark:bg-dark-bg',
  bgHover: 'hover:bg-gray-100 dark:hover:bg-dark-hover',
  bgInput: 'bg-white dark:bg-dark-card',
  
  // Text colors
  textPrimary: 'text-gray-900 dark:text-white',
  textSecondary: 'text-gray-600 dark:text-gray-400',
  textMuted: 'text-gray-500 dark:text-gray-500',
  
  // Borders
  border: 'border-gray-200 dark:border-dark-border',
  borderHover: 'hover:border-gray-300 dark:hover:border-gray-600',
  
  // Buttons
  btnPrimary: 'bg-primary-600 dark:bg-primary-500 hover:bg-primary-700 dark:hover:bg-primary-600 text-white',
  btnSecondary: 'bg-gray-200 dark:bg-dark-hover hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white',
  btnOutline: 'border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-primary-600 dark:hover:bg-primary-500 hover:text-white',
  
  // Shadows
  shadow: 'shadow-md dark:shadow-gray-900/50',
  shadowLg: 'shadow-lg dark:shadow-gray-900/50',
  shadowHover: 'hover:shadow-xl dark:hover:shadow-gray-900/70',
  
  // Loading states
  skeleton: 'bg-slate-200 dark:bg-dark-hover animate-pulse',
  
  // Links
  link: 'text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300',
};

export default darkModeClasses;
