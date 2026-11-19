import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "../features/watchlist/watchlistSlice";
import showsReducer from "../features/shows/showsSlice";

export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    shows: showsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
