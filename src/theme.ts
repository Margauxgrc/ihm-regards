import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    border: {
      main: string;
      hover: string;
    };
    custom: {
      icon: string;
      label: string;
    };
  }
  interface PaletteOptions {
    border?: {
      main: string;
      hover: string;
    };
    custom?: {
      icon: string;
      label: string;
    };
  }
}

const theme = createTheme({
  palette: {
    background: {
      default: '#121212',
      paper: '#2c2c2c',
    },
    text: {
      primary: '#FAFAFA',
      secondary: '#BDBDBD',
    },
    border: {
      main: '#616161',
      hover: '#9E9E9E',
    },
    custom: {
      icon: '#FAFAFA',
      label: '#BDBDBD',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          width: 800,
          padding: 32,
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          padding: 0,
        }),
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.border.main,
          },
          '& .MuiSvgIcon-root': {
            color: theme.palette.custom.icon,
          },
        }),
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          width: 100,
          padding: 0,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 450,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: ({ theme }) => ({
          '&:before': {
            borderBottomColor: theme.palette.border.main,
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottomColor: theme.palette.border.hover,
          },
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.custom.label,
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          size: 'small',
          color: theme.palette.custom.icon,
        }),
      },
    },
    MuiSvgIcon: {
      defaultProps: {
        fontSize: 'small',
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: theme.palette.border.main,
        }),
      },
    },
  },
});

export default theme;
