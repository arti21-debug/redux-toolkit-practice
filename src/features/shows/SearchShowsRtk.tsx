import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { added } from "../watchlist/watchlistSlice";
import { useSearchShowsQuery } from "./showsApi";

export default function SearchShowsRtk() {
  // input — то, что пользователь печатает; query — то, что реально ищем
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();

  // skip: пока строка пустая, запрос не отправляется
  const {
    data: shows = [],
    isLoading,
    isFetching,
    isError,
    isSuccess,
  } = useSearchShowsQuery(query, { skip: query === "" });

  const handleSearch = () => setQuery(input.trim());

  return (
    <div>
      <h3>Search (RTK Query)</h3>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search shows..."
      />
      <button onClick={handleSearch} disabled={isFetching}>
        Search
      </button>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}
      {isSuccess && shows.length === 0 && <p>Nothing found</p>}

      <ul>
        {shows.map((show) => (
          <li key={show.id}>
            {show.name}{" "}
            <button
              onClick={() =>
                dispatch(
                  added({ id: show.id, title: show.name, watched: false }),
                )
              }
            >
              Add to watchlist
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
