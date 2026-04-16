// Theme configuration
export const theme = {
  colors: {
    primary: {
      main: '#667eea',
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#764ba2',
      light: '#9333ea',
      dark: '#6b21a8',
    },
    background: {
      default: '#f7fafc',
      paper: '#ffffff',
      dark: '#1a1a2e',
    },
    text: {
      primary: '#1a202c',
      secondary: '#4a5568',
      disabled: '#a0aec0',
    },
    error: '#e53e3e',
    success: '#38a169',
    warning: '#d69e2e',
    info: '#3182ce',
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 25px 50px rgba(0, 0, 0, 0.25)',
  },
  
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
    },
  },
} as const;

export type Theme = typeof theme;
export default theme;
