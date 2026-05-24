import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Movie } from "../movies/types";

type FavoritesState = {
  movies: Movie[];
};

const initialState: FavoritesState = {
  movies: []
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;

      if (state.movies.some((item) => item.id === movie.id)) {
        state.movies = state.movies.filter((item) => item.id !== movie.id);
        return;
      }

      state.movies.push(movie);
    }
  }
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
