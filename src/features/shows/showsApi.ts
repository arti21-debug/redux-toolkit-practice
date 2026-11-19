import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Show } from "./showsSlice";

// Форма ответа TVMaze: данные лежат внутри поля show
interface SearchResult {
  score: number;
  show: Show;
}

export const showsApi = createApi({
  // Уникальный ключ, под которым RTK Query хранит кэш в store
  reducerPath: "showsApi",

  // Базовый адрес: к нему добавляются пути из endpoints
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.tvmaze.com" }),

  endpoints: (builder) => ({
    // <Show[], string>: что вернётся, и какой аргумент принимает запрос
    searchShows: builder.query<Show[], string>({
      query: (q) => `search/shows?q=${encodeURIComponent(q)}`,
      // Достаём show из каждого элемента, как делали в thunk
      transformResponse: (response: SearchResult[]) =>
        response.map((r) => r.show),
    }),
  }),
});

// Хук создан автоматически по имени endpoint: searchShows → useSearchShowsQuery
export const { useSearchShowsQuery } = showsApi;
