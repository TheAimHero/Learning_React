import { useState, useEffect } from "react";

const API_KEY = "5c9e1c17";

export default function useMovies(query) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError("");
    if (!query.length === 0 || query.length <= 3) {
      setMovies([]);
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    const searchTimer = setTimeout(async () => {
      try {
        const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;
        const res = await fetch(url, { signal: controller.signal }).catch(
          () => {
            throw new Error("Something went wrong");
          }
        );
        const data = await res.json();
        if (data.Response === "False") throw new Error(data.Error);
        setMovies(data.Search);
        setLoading(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => {
      clearTimeout(searchTimer);
      controller.abort();
    };
  }, [query]);

  return { loading, error, movies };
}
