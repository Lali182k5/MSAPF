import React, { useMemo, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getAppTheme } from './theme';

function Root() {
  const [mode, setMode] = useState(() => localStorage.getItem('themeMode') || 'light');
  useEffect(() => localStorage.setItem('themeMode', mode), [mode]);
  const theme = useMemo(() => getAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App themeMode={mode} setThemeMode={setMode} />
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
