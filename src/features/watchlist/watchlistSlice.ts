import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface Movie {
  id: number;
  title: string;
  watched: boolean;
}

interface WatchlistState {
  items: Movie[];
}

const initialState: WatchlistState = { items: [] };

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    added: (state, action: PayloadAction<Movie>) => {
      state.items.push(action.payload); // можно «мутировать»: это работает через Immer
    },
    removed: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((m) => m.id !== action.payload);
    },
    toggleWatched: (state, action: PayloadAction<number>) => {
      const movie = state.items.find((m) => m.id === action.payload);
      if (movie) {
        movie.watched = !movie.watched;
      }
    },
  },
});

export const { added, removed, toggleWatched } = watchlistSlice.actions;

export const selectWatchedCount = (state: RootState) =>
  state.watchlist.items.filter((m) => m.watched).length;

export default watchlistSlice.reducer;