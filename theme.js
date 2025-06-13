
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    primary: {
      main: '#1e88e5',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: 'rgba(30, 30, 30, 0.95)',
    },
    primary: {
      main: '#1e88e5',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});
