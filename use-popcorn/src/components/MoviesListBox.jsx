import React from "react";

import MovieElement from "./MovieElement";

function MoviesList(props) {
  const { movies, setSelectedId } = props;
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieElement
          movie={movie}
          setSelectedId={setSelectedId}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}

export default function MoviesListBox(props) {
  const { movies, setSelectedId } = props;

  return <MoviesList movies={movies} setSelectedId={setSelectedId} />;
}
