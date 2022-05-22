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
  }
})

export default theme
