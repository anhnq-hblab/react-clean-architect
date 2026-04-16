// Environment configuration
export const config = {
  // API
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  
  // App
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Clean App',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Features
  ENABLE_DEBUG: import.meta.env.DEV,
  
  // Timeouts
  API_TIMEOUT: 30000,
  TOKEN_REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutes before expiry
} as const;

export default config;
