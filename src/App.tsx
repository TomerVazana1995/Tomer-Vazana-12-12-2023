import { useMemo, useState } from "react";
import Home from "./components/home/Home";
import Favorites from "./components/favorites/Favorites";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme";
import { createTheme } from "@mui/material/styles";
import { ThemeContext } from "./context/themeContext";
import { IconContext } from "react-icons";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ThemeContext.Provider value={{ mode, setMode }}>
          <IconContext.Provider
            value={{
              size: "1.5rem",
              color: mode === "light" ? "black" : "white",
            }}
          >
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </IconContext.Provider>
        </ThemeContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
