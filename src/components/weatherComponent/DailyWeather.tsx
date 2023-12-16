import { Box, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";

type Props = {
  day: string;
  dayWeatherDescription: string;
  minTemp: number;
  maxTemp: number;
};

const DailyWeather = ({
  day,
  dayWeatherDescription,
  minTemp,
  maxTemp,
}: Props) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const newDay = new Date(day);

  const dayOfTheWeek = newDay.getDay();
  const dayOfTheWeekString = daysOfWeek[dayOfTheWeek];

  const { palette } = useTheme();

  const { mode } = useContext(ThemeContext) || {
    mode: "light",
  };

  return (
    <Box
      width="90%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="1rem"
      margin="1rem"
      borderRadius={1}
      bgcolor={mode === "light" ? palette.grey[100] : "#154857"}
      boxShadow={2}
    >
      <Typography>{dayOfTheWeekString}</Typography>
      <Box display="flex" justifyContent="space-between" width="40%">
        <Typography>{dayWeatherDescription}</Typography>
        <Typography>
          {minTemp}° - {maxTemp}°
        </Typography>
      </Box>
    </Box>
  );
};

export default DailyWeather;
