import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import favoritesReducer from "./favoritesSlice";
import favoriteKeysReducer from "./favoriteKeySlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["favoriteKeys"],
};

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  favoriteKeys: favoriteKeysReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof rootReducer>;
