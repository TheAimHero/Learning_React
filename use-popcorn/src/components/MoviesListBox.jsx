import React  from "react";

import MovieElement from "./MovieElement";
import Box from "./Box";

function MoviesList(props) {
  const { movies } = props;
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <MovieElement movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

export default function MoviesListBox(props) {
  const { movies } = props;

  return (
    <Box>
      <MoviesList movies={movies} />
    </Box>
  );
}
