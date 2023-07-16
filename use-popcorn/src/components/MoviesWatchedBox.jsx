import React, { useState, Fragment, useEffect } from "react";

import MovieWatched from "./MovieWatched";
import WatchStats from "./WatchedStats";
import WatchedMovieList from "./WatchedMovieList";
import Loader from "./Loader";
import useLocalStorage from "../custom_hooks/useLocalStorage";

const API_KEY = "5c9e1c17";

export default function MoviesWatchedBox(props) {
  const { movie, setMovie, selectedId, setSelectedId } = props;
  const [watched, setWatched] = useLocalStorage([], "watched");
  const [loading, setLoading] = useState(false);

  function onDeleteMovie(id) {
    setWatched((watched) => {
      const removeMovie = watched.filter((movie) => movie.imdbID !== id);
      return removeMovie;
    });
  }

  function handleSetWatched(movie) {
    const watchedInc = watched.some((m) => m.imdbID === movie.imdbID);
    if (watchedInc) {
      setWatched([...watched]);
      return;
    }
    setWatched([...watched, movie]);
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovieById() {
      try {
        setLoading(true);
        setMovie(null);
        const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`;
        const res = await fetch(url, { signal: controller.signal }).catch(
          () => {
            throw new Error("Something went wrong");
          }
        );
        const data = await res.json();
        if (data.Response === "False") throw new Error(data.Error);
        setMovie(data);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    }

    if (!selectedId) return;

    const watchedMovie = watched.find((movie) => movie.imdbID === selectedId);
    if (watchedMovie) {
      setMovie(watchedMovie);
      return;
    }

    fetchMovieById();

    return () => controller.abort();
  }, [watched, setMovie, selectedId]);

  return (
    <Fragment>
      {!movie && !loading && <WatchStats watched={watched} />}
      {loading && <Loader />}
      {!movie && !loading && (
        <WatchedMovieList onDeleteMovie={onDeleteMovie} watched={watched} />
      )}
      {movie && !loading && (
        <MovieWatched
          onCloseMovie={() => {
            setMovie(null);
            setSelectedId(null);
          }}
          movie={movie}
          key={movie.imdbID}
          setWatched={handleSetWatched}
        ></MovieWatched>
      )}
    </Fragment>
  );
}
