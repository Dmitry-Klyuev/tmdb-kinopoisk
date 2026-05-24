import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FavoritesState = {
  ids: number[];
};

const initialState: FavoritesState = {
  ids: []
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const movieId = action.payload;

      if (state.ids.includes(movieId)) {
        state.ids = state.ids.filter((id) => id !== movieId);
        return;
      }

      state.ids.push(movieId);
    }
  }
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
