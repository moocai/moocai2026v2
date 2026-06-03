import { createTheme, Theme } from '@mui/material/styles';

type ThemeMode = 'light' | 'dark';

export function getTheme(mode: ThemeMode): Theme {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            primary: { main: '#8400ff' },
            secondary: { main: '#ec4899' },
            background: {default: '#141414', paper: '#141414'},
          }
        : {
            primary: { main: '#8400ff' },
            secondary: { main: '#ec4899' },
            background: { default: 'white', paper: 'white' },
          }),
    },
    typography: {fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif'},
    shape: { borderRadius: 12 },
    components: {
      MuiButton: {styleOverrides: {root: {textTransform: 'none', fontWeight: 600 }}},
      MuiCard: {styleOverrides: {root: {borderRadius: 16 }}},
    },
  });
}
