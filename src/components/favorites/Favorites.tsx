import { Box } from "@mui/material";
import FavoriteWeather from "./FavoriteWeather";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ToastContainer } from "react-toastify";

const Favorites = () => {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  return (
    <Box
      width="100%"
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      gap="2rem"
      marginTop="4rem"
      marginBottom="4rem"
    >
      <ToastContainer />
      {favorites &&
        favorites.map((fav) => (
          <FavoriteWeather
            key={fav.cityKey}
            city={fav.city}
            cityKey={fav.cityKey}
          />
        ))}
    </Box>
  );
};

export default Favorites;
