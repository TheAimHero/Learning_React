import { Fragment, useEffect, useState } from "react";

import Main from "./components/Main";
import Navbar from "./components/Navbar";
import ErrorMessage from "./components/ErrorMessage";
import Loader from "./components/Loader";
import Box from "./components/Box";
import Logo from "./components/Logo";
import SearchBox from "./components/SearchBox";
import ResultsNum from "./components/ResultsNum";
import MoviesListBox from "./components/MoviesListBox";
import MoviesWatchedBox from "./components/MoviesWatchedBox";
import useMovies from "./custom_hooks/useMovies";
import useKey from "./custom_hooks/useKey";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [movie, setMovie] = useState(null);
  const { movies, loading, error } = useMovies(query);

  function closeMovie() {
    setMovie(null);
    setSelectedId(null);
  }

  useKey("Escape",closeMovie);

  // useEffect(() => {
  //   document.addEventListener("keydown", (e) => {
  //     if (e.key === "Escape") {
  //       setMovie(null);
  //       setSelectedId(null);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    if (!movie) return;
    document.title = `Movie | ${movie.Title}`;
    return () => (document.title = "usePopcorn");
  }, [movie]);

  return (
    <Fragment>
      <Navbar>
        <Logo />
        <SearchBox query={query} setQuery={setQuery} />
        <ResultsNum numMovies={movies.length} />
      </Navbar>
      <Main>
        <Box>
          {loading && !error && <Loader />}
          {!loading && !error && (
            <MoviesListBox setSelectedId={setSelectedId} movies={movies} />
          )}
          {!loading && error && <ErrorMessage error={error} />}
        </Box>
        <Box>
          <MoviesWatchedBox
            movie={movie}
            setMovie={setMovie}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        </Box>
      </Main>
    </Fragment>
  );
}
