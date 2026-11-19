import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { added } from "../watchlist/watchlistSlice";
import {
  fetchShows,
  selectShows,
  selectShowsStatus,
  selectShowsError,
} from "./showsSlice";

export default function SearchShows() {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();
  const shows = useAppSelector(selectShows);
  const status = useAppSelector(selectShowsStatus);
  const error = useAppSelector(selectShowsError);

  const handleSearch = () => {
    const q = query.trim();
    if (q) dispatch(fetchShows(q));
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search shows..."
      />
      <button onClick={handleSearch} disabled={status === "loading"}>
        Search
      </button>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && shows.length === 0 && <p>Nothing found</p>}

      <ul>
        {shows.map((show) => (
          <li key={show.id}>
            {show.name} {show.premiered && `(${show.premiered.slice(0, 4)})`}{" "}
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
