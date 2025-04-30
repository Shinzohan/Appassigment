// src/components/ThemeProvider.tsx
'use client';

import * as React from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getDesignTokens } from '@/theme/getDesignTokens';
import { inputsCustomizations } from '@/theme/inputsCustomizations';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const mode = prefersDarkMode ? 'dark' : 'light';

  const theme = React.useMemo(
    () =>
      createTheme({
        ...getDesignTokens(mode),
        components: {
          ...inputsCustomizations,
        },
      }),
    [mode],
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
