import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#C42727",
      contrastText: "#FFFDCC",
    },
    secondary: {
      main: "#D8B024",
      contrastText: "#202020",
    },
    background: {
      default: "#202020",
      paper: "#3f3f3f",
    },
    text: {
      primary: "#FFFDCC",
    },
  },
  typography: {
    fontFamily: "EB Garamond",
    body1: {
      fontFamily: "Josefin Sans",
    },
    body2: {
      fontFamily: "Josefin Sans",
    },
    caption: {
      fontFamily: "Josefin Sans",
    },
    subtitle1: {
      fontFamily: "Josefin Sans",
    },
    subtitle2: {
      fontFamily: "Josefin Sans",
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          // Name of the slot
          input: {
            // Some CSS
            color: "black",
          },
        },
      },
    },
  },
});

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
