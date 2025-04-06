import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A365D', // Deep blue - conveys trust and financial stability
      light: '#2A4A7F',
      dark: '#0F2A4A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2C7A7B', // Teal - fresh and modern
      light: '#3B9596',
      dark: '#1D5F60',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#F56565', // Coral - for important actions and alerts
      light: '#F78181',
      dark: '#E53E3E',
    },
    warning: {
      main: '#ED8936',
      light: '#F6AD55',
      dark: '#DD6B20',
    },
    info: {
      main: '#4299E1',
      light: '#63B3ED',
      dark: '#3182CE',
    },
    success: {
      main: '#48BB78',
      light: '#68D391',
      dark: '#38A169',
    },
    background: {
      default: '#F7FAFC', // Light gray - clean and professional
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3748', // Dark gray - high readability
      secondary: '#4A5568',
      disabled: '#A0AEC0',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.125rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

export default theme;
