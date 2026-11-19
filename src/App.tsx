import { useAppDispatch, useAppSelector } from "./app/hooks";
import { added, removed, selectWatchedCount } from "./features/watchlist/watchlistSlice";

export default function App() {
  const items = useAppSelector((state) => state.watchlist.items);
  const dispatch = useAppDispatch();
  const watchedCount = useAppSelector(selectWatchedCount);

  return (
    <div>
      <button
        onClick={() =>
          dispatch(
            added({ id: Date.now(), title: "Inception", watched: false }),
          )
        }
      >
        Add movie
      </button>
      <ul>
        {items.map((m) => (
          <li key={m.id}>
            {m.title}{" "}
            <button onClick={() => dispatch(removed(m.id))}>Remove</button>
            <button>{m.watched ? "Watched" : "Mark as watched"}</button>
          </li>
        ))}
      </ul>
      <p>Watched: {watchedCount}</p>
    </div>
  );
}
