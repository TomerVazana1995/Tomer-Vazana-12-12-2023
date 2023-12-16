import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { removeFromFavorites } from "../../redux/favoritesSlice";
import { changeKey, changeCity } from "../../redux/favoriteKeySlice";
import { useDispatch } from "react-redux";
import { ThemeContext } from "../../context/themeContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

type Props = {
  city: string | undefined;
  cityKey: string | undefined;
};

const FavoriteWeather = ({ city, cityKey }: Props) => {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { palette } = useTheme();

  const { mode } = useContext(ThemeContext) || {
    mode: "light",
  };

  useEffect(() => {
    if (cityKey) {
      const getFavoriteCurrentWeather = async () => {
        try {
          const { data } = await axios.get(
            `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}`,
            { params: { apikey: "DoLBVCg6b3KHKxccugjfR9pw6H8tyGEG" } }
          );
          setCurrentWeather({
            temp: data[0].Temperature.Imperial.Value,
            weatherDescription: data[0].WeatherText,
          });
        } catch (error) {
          toast.error(
            "We couldn't find the weather from your location, please try again",
            {
              position: toast.POSITION.TOP_LEFT,
            }
          );
        }
      };

      getFavoriteCurrentWeather();
    }
  }, [cityKey]);

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorites(cityKey));
  };

  const showDetails = () => {
    dispatch(changeKey(cityKey));
    dispatch(changeCity(city));
    navigate("/");
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        padding="1rem"
        alignItems="center"
        gap="1rem"
        bgcolor={mode === "light" ? "white" : palette.primary.light}
        boxShadow={1}
        borderRadius={1}
      >
        <Typography fontWeight="bold">{city}</Typography>
        {currentWeather ? (
          <>
            <Typography>{currentWeather.temp}°</Typography>
            <Typography>{currentWeather.weatherDescription}</Typography>
            <Button onClick={showDetails}>Show Details</Button>
            <Button onClick={handleRemoveFromFavorites}>
              Remove From Favorites
            </Button>
          </>
        ) : (
          <Typography>loading...</Typography>
        )}
      </Box>
    </motion.div>
  );
};

export default FavoriteWeather;
