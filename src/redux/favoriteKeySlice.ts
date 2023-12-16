import { createSlice } from "@reduxjs/toolkit";

type FavoriteKeysState = {
  favoriteKey: string;
  favoriteCity: string;
  hasInitialGeolocationRun: boolean;
};

const initialState: FavoriteKeysState = {
  favoriteKey: "",
  favoriteCity: "",
  hasInitialGeolocationRun: false,
};

export const favoriteKeysSlice = createSlice({
  name: "favoriteKeys",
  initialState,
  reducers: {
    changeKey: (state, key) => {
      state.favoriteKey = key.payload;
    },
    changeCity: (state, city) => {
      state.favoriteCity = city.payload;
    },
    changeHasInitialGeolocationRun: (state, flag) => {
      state.hasInitialGeolocationRun = flag.payload;
    },
  },
});

export const { changeKey, changeCity, changeHasInitialGeolocationRun } =
  favoriteKeysSlice.actions;

export default favoriteKeysSlice.reducer;
