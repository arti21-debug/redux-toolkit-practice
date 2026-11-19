import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface Show {
  id: number;
  name: string;
  premiered: string | null;
  image: { medium: string } | null;
}

interface SearchResult {
  score: number;
  show: Show;
}

interface ShowsState {
  items: Show[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ShowsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchShows = createAsyncThunk(
  "shows/fetch",
  async (query: string) => {
    const res = await fetch(
      `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`,
    );
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const data: SearchResult[] = await res.json();
    return data.map((r) => r.show);
  },
);

const showsSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {}, // // Собственных действий у slice нет, но поле обязательно: оставляем пустым

  // Реакция на «чужие» действия: здесь это три действия thunk fetchShows
  extraReducers: (builder) => {
    builder
      // 1. Запрос начался
      .addCase(fetchShows.pending, (state) => {
        // Показываем индикатор загрузки
        state.status = "loading";
        // Сбрасываем ошибку от прошлой попытки, иначе она останется на экране
        state.error = null;
      })

      // 2a. Запрос успешно завершился
      // action.payload = то, что вернул thunk (массив Show[]);
      // TypeScript выводит этот тип сам из return в createAsyncThunk
      .addCase(fetchShows.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Полностью заменяем список результатов новыми данными
        state.items = action.payload;
      })

      // 2b. Запрос упал (сеть, статус 4xx/5xx, любая ошибка внутри thunk)
      // action.error.message = текст из throw new Error(...) или сообщение браузера
      .addCase(fetchShows.rejected, (state, action) => {
        state.status = "failed";
        // ?? 'Unknown error' нужен, потому что message может быть undefined
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default showsSlice.reducer;

// Селекторы: читают нужные куски состояния; RootState даёт типизацию всего state
export const selectShows = (state: RootState) => state.shows.items;
export const selectShowsStatus = (state: RootState) => state.shows.status;
export const selectShowsError = (state: RootState) => state.shows.error;