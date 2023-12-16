import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import SearchBar from "../searchBar/SearchBar";
import Weather from "../weatherComponent/Weather";
import axios from "axios";
import { CityWeekWeather } from "../../shared/types";
import { useSelector, useDispatch } from "react-redux";
import { changeHasInitialGeolocationRun } from "../../redux/favoriteKeySlice";
import { RootState } from "../../redux/store";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const [cityKey, setCityKey] = useState<string | undefined>(undefined);
  const [cityName, setCityName] = useState<string | undefined>(undefined);

  const [cityWeekWeather, setCityWeekWeather] =
    useState<CityWeekWeather | null>(null);

  const [geolocation, setGeolocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>();

  const dispatch = useDispatch();

  const { favoriteKey, favoriteCity, hasInitialGeolocationRun } = useSelector(
    (state: RootState) => state.favoriteKeys
  );

  useEffect(() => {
    if (!hasInitialGeolocationRun) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeolocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        dispatch(changeHasInitialGeolocationRun(true));
      });
    }
  }, []);

  useEffect(() => {
    if (geolocation) {
      const getCurrentWeatherByGeolocation = async () => {
        try {
          const { data } = await axios.get(
            `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search`,
            {
              params: {
                apikey: "DoLBVCg6b3KHKxccugjfR9pw6H8tyGEG",
                q: `${geolocation.latitude},${geolocation.longitude}`,
              },
            }
          );
          if (data) {
            setCityKey(data.Key);
            setCityName(data.AdministrativeArea.LocalizedName);
          }
        } catch (error) {
          toast.error(
            "We couldn't find the weather from your location, please try again",
            {
              position: toast.POSITION.TOP_LEFT,
            }
          );
        }
      };
      getCurrentWeatherByGeolocation();
    }
  }, [geolocation]);

  useEffect(() => {
    if (favoriteKey) {
      setCityKey(favoriteKey);
      setCityName(favoriteCity);
    }
  }, [favoriteKey]);

  useEffect(() => {
    if (cityKey) {
      const getCityWeekWeather = async () => {
        try {
          const { data } = await axios.get(
            `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}`,
            { params: { apikey: "DoLBVCg6b3KHKxccugjfR9pw6H8tyGEG" } }
          );

          setCityWeekWeather({
            weatherDescription: data.Headline.Text,
            city: cityName,
            cityKey: cityKey,
            days: data?.DailyForecasts?.map((dailyForecast: any) => ({
              day: dailyForecast.Date,
              dayWeatherDescription: dailyForecast.Day.IconPhrase,
              minTemp: dailyForecast.Temperature.Minimum.Value,
              maxTemp: dailyForecast.Temperature.Maximum.Value,
            })),
          });
        } catch (error) {
          toast.error("Something went wrong please try again.", {
            position: toast.POSITION.TOP_LEFT,
          });
        }
      };

      getCityWeekWeather();
    }
  }, [cityKey]);

  return (
    <Box
      maxWidth="100%"
      maxHeight="100%"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <ToastContainer />
      <Box width="40%">
        <SearchBar setCityKey={setCityKey} setCityName={setCityName} />
      </Box>
      {cityWeekWeather?.days && (
        <Weather
          days={cityWeekWeather?.days}
          weatherDescription={cityWeekWeather?.weatherDescription}
          city={cityWeekWeather?.city}
          cityKey={cityWeekWeather?.cityKey}
        />
      )}
    </Box>
  );
};

export default Home;
