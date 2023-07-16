import React from "react";

function WatchedMovies(props) {
  const { watched, onDeleteMovie } = props;
  const watchedMovies = watched.map((movie) => {
    return (
      <li key={movie.imdbID}>
        <img src={movie.Poster} alt={movie.Title} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>⭐</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.Runtime}</span>
          </p>
          <button
            className="btn-delete"
            onClick={() => {
              onDeleteMovie(movie.imdbID);
            }}
          >
            X
          </button>
        </div>
      </li>
    );
  });

  return watchedMovies;
}

export default function WatchedMovieList(props) {
  const { watched, onDeleteMovie } = props;
  return (
    <ul className="list list-watched">
      <WatchedMovies onDeleteMovie={onDeleteMovie} watched={watched} />
    </ul>
  );
}
