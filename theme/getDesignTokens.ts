
import { ThemeOptions } from '@mui/material/styles';

export function getDesignTokens(mode: 'light' | 'dark'): ThemeOptions {
  return {
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: { main: '#1976d2' },
            background: {
              default: '#f9f9f9',
              paper: '#ffffff',
            },
            text: {
              primary: '#111',
              secondary: '#555',
            },
          }
        : {
            primary: { main: '#90caf9' },
            background: {
              default: '#121212',
              paper: '#1e1e2f',
            },
            text: {
              primary: '#fff',
              secondary: '#ccc',
            },
          }),
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
  };
}
