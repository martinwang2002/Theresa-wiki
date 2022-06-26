import type { ThemeOptions } from "@mui/material/styles"

// Create a theme instance.
const themeOptions = {
  components: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          letterSpacing: "normal",
          lineHeight: "normal",
          overflow: "hidden"
        }
      }
    }
  },
  palette: {
    error: {
      main: "#c4001d"
    },
    primary: {
      contrastText: "#fff",
      main: "#00b3fd"
    },
    secondary: {
      main: "#ff5205"
    },
    tonalOffset: 0.05
  },
  typography: {
    fontFamily: "\"Noto Serif SC\", sans-serif"
  }
} as ThemeOptions

export default themeOptions
