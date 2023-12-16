import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { CiLight, CiDark } from "react-icons/ci";
import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";
import { IconContext } from "react-icons";

const Header = () => {
  const { mode, setMode } = useContext(ThemeContext) || {
    mode: "light",
    setMode: () => {},
  };

  const handleModeChange = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  return (
    <Box width="100%" paddingY="1rem" bgcolor="#006B7D">
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="row"
        alignItems="center"
      >
        <Box marginLeft="2rem">
          <Typography fontWeight="bold" color="white">
            WEATHER APP
          </Typography>
        </Box>
        <Box marginRight="2rem">
          <Link to="/">
            <Button variant="text">
              <Typography color="white">Home</Typography>
            </Button>
          </Link>
          <Link to="/favorites">
            <Button size="large">
              <Typography color="white">Favorites</Typography>
            </Button>
          </Link>
          {mode === "light" ? (
            <Button onClick={handleModeChange}>
              <IconContext.Provider value={{ color: "white", size: "1.5rem" }}>
                <CiDark />
              </IconContext.Provider>
            </Button>
          ) : (
            <Button onClick={handleModeChange}>
              <CiLight />
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
