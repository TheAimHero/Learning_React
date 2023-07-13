import React, { useState, Fragment } from "react";

import MovieWatched from "./MovieWatched";
import WatchStats from "./WatchedStats";
import Box from "./Box";

import tempWatchedData from "../dev-data/tempWatched";

function WatchedMoviesList(props) {
  const { watched } = props;
  return (
    <ul className="list">
      {watched.map((movie) => (
        <MovieWatched movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

export default function MoviesWatchedBox() {
  const [watched] = useState(tempWatchedData);

  return (
    <Box>
      <Fragment>
        <WatchStats watched={watched} />
        <WatchedMoviesList watched={watched} />
      </Fragment>
    </Box>
  );
}
