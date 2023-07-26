import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import App from "./App";
import { UserContextProvider } from "./contexts/UserContext";
import { SessionContextProvider } from "./contexts/SessionContext";
import { AdminContextProvider } from "./contexts/AdminContext";
import CustomRouter from "./components/CustomRouter";
import customHistory from "./services/history";

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
  },
});

root.render(
  <React.StrictMode>
    <CustomRouter history={customHistory}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AdminContextProvider>
          <UserContextProvider>
            <SessionContextProvider>
              <App />
            </SessionContextProvider>
          </UserContextProvider>
        </AdminContextProvider>
      </ThemeProvider>
    </CustomRouter>
  </React.StrictMode>
);
