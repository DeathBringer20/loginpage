// App.tsx
import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, IconButton } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import LoginPage from './LoginPage';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <IconButton onClick={() => setDarkMode((prev) => !prev)} color="inherit">
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </div>
      <LoginPage />
    </ThemeProvider>
  );
};

export default App;
