// favoritesSlice.js

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FavoritesState = {
  favorites: { city: string | undefined; cityKey: string | undefined }[];
};

const initialState: FavoritesState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (
      state,
      action: PayloadAction<{
        city: string | undefined;
        cityKey: string | undefined;
      }>
    ) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<string | undefined>) => {
      state.favorites = state.favorites.filter(
        (fav) => fav.cityKey !== action.payload
      );
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
