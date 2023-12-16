import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/themeContext";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favoritesSlice";
import { CityWeekWeather } from "../../shared/types";
import DailyWeather from "./DailyWeather";
import { RootState } from "../../redux/store";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { FAHRENHEIT, CELSIUS } from "./consts";

const Weather = (cityWeeklyWeather: CityWeekWeather) => {
  const [isOnFavorites, setIsOnFavorites] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState("Fahrenheit");
  const [days, setDays] = useState<
    {
      day: string;
      minTemp: number;
      maxTemp: number;
      dayWeatherDescription: string;
    }[]
  >();

  const dispatch = useDispatch();

  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const { palette } = useTheme();

  const { mode } = useContext(ThemeContext) || {
    mode: "light",
  };

  //check if city is already on favorites
  useEffect(() => {
    const { cityKey } = cityWeeklyWeather;
    const isFavorite = favorites.some(
      (fav: { city: string | undefined; cityKey: string | undefined }) =>
        fav.cityKey === cityKey
    );
    if (isFavorite) {
      setIsOnFavorites(true);
    }
  }, []);

  //add or remove city to favorites
  const handleAddOrRemoveToFavorites = () => {
    const { city, cityKey } = cityWeeklyWeather;
    const isFavorite = favorites.some(
      (fav: { city: string | undefined; cityKey: string | undefined }) =>
        fav.cityKey === cityKey
    );
    if (!isFavorite) {
      dispatch(addToFavorites({ city, cityKey }));
      setIsOnFavorites(true);
    } else {
      dispatch(removeFromFavorites(cityKey));
      setIsOnFavorites(false);
    }
  };

  const fahrenheitToCelsius = (temp: number) => {
    return Number(((temp - 32) * (5 / 9)).toFixed(0));
  };

  const celsiusToFahrenheit = (temp: number) => {
    return Number((temp * 1.8 + 32).toFixed(0));
  };

  const changeTemperatureUnit = () => {
    if (temperatureUnit === FAHRENHEIT) {
      const weekWeather = cityWeeklyWeather.days?.map((dayWeather) => ({
        day: dayWeather.day,
        dayWeatherDescription: dayWeather.dayWeatherDescription,
        minTemp: fahrenheitToCelsius(dayWeather.minTemp),
        maxTemp: fahrenheitToCelsius(dayWeather.maxTemp),
      }));
      setTemperatureUnit(CELSIUS);
      setDays(weekWeather);
    } else if (temperatureUnit === CELSIUS && days) {
      const weekWeather = days.map((dayWeather) => ({
        day: dayWeather.day,
        dayWeatherDescription: dayWeather.dayWeatherDescription,
        minTemp: celsiusToFahrenheit(dayWeather.minTemp),
        maxTemp: celsiusToFahrenheit(dayWeather.maxTemp),
      }));
      setTemperatureUnit(FAHRENHEIT);
      setDays(weekWeather);
    }
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
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        width="90%"
        display="flex"
        flexDirection="column"
        boxShadow={1}
        padding="1rem"
        marginTop="1rem"
        borderRadius={2}
        bgcolor={mode === "light" ? "white" : palette.primary.light}
      >
        <Box display="flex" paddingX="1.5rem" justifyContent="space-between">
          <Box>
            <Typography fontWeight="bold">
              {cityWeeklyWeather.city} Weather
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Button onClick={handleAddOrRemoveToFavorites}>
              {isOnFavorites ? <FaHeart /> : <FaRegHeart />}
            </Button>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center">
          <Typography textAlign="center">
            {cityWeeklyWeather.weatherDescription}
          </Typography>
        </Box>
        <Button
          style={{ width: "50%", alignSelf: "center" }}
          onClick={changeTemperatureUnit}
        >
          Change Temperature Unit: {temperatureUnit}
        </Button>
        <Box display="flex" justifyContent="space-evenly" flexWrap="wrap">
          {days
            ? days.map(({ day, minTemp, maxTemp, dayWeatherDescription }) => (
                <DailyWeather
                  key={day}
                  day={day}
                  dayWeatherDescription={dayWeatherDescription}
                  minTemp={minTemp}
                  maxTemp={maxTemp}
                />
              ))
            : cityWeeklyWeather?.days?.map(
                ({ day, minTemp, maxTemp, dayWeatherDescription }) => (
                  <DailyWeather
                    key={day}
                    day={day}
                    minTemp={minTemp}
                    maxTemp={maxTemp}
                    dayWeatherDescription={dayWeatherDescription}
                  />
                )
              )}
        </Box>
      </Box>
    </motion.div>
  );
};

export default Weather;
