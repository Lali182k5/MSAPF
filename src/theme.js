import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const getAppTheme = (mode = 'light') =>
  createTheme({
    palette: {
      mode,
      primary: { main: mode === 'light' ? '#6a5acd' : '#8e7dff' }, // SlatePurple
      secondary: { main: '#ff6aa2' }, // Pink
      background: {
        default: mode === 'light' ? '#faf9ff' : '#0f1020',
        paper: mode === 'light' ? '#ffffff' : '#16182a',
      },
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily: `'Inter', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`,
      h5: { fontWeight: 700 },
      button: { fontWeight: 700, textTransform: 'none' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background:
              mode === 'light'
                ? 'radial-gradient(80rem 40rem at 10% 0%, #f5f0ff 0%, transparent 60%)'
                : 'radial-gradient(80rem 40rem at 10% 0%, #1a1940 0%, transparent 60%)',
            transition: 'background 300ms ease',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'transform 180ms ease, box-shadow 180ms ease',
            '&:hover': { transform: 'translateY(-2px)' },
          },
        },
      },
    },
  });
