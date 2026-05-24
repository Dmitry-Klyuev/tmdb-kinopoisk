import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer from "../features/favorites/favoritesSlice";
import { moviesApi } from "../features/movies/moviesApi";
import requestReducer from "../features/request/requestSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    request: requestReducer,
    theme: themeReducer,
    [moviesApi.reducerPath]: moviesApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
