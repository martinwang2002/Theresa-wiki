import { createTheme } from "@mui/material/styles"

// Create a theme instance.
const theme = createTheme({
  components: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          letterSpacing: "normal",
          lineHeight: "normal"
        }
      }
    }
  },
  palette: {
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
})

export default theme
