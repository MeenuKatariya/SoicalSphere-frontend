import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LoginContextProvider } from "./context/loginContext";
const theme = createTheme({
  palette: {
    dark: {
      main: "#121212",
      light: "#fff",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <LoginContextProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </LoginContextProvider>
  </BrowserRouter>
);


