import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "../features/watchlist/watchlistSlice";
import showsReducer from "../features/shows/showsSlice";
import { showsApi } from "../features/shows/showsApi";

export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    shows: showsReducer,
    [showsApi.reducerPath]: showsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(showsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
