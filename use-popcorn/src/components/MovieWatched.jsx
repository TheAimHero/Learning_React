import React from "react";

import StarRating from "./StarRating";

export default function MovieWatched(props) {
  const { movie, onCloseMovie, children, setWatched } = props;

  function handleRating(rating) {
    movie.userRating = rating;
  }

  return (
    <div key={movie.imdbID} className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          {"<"}
        </button>
        <img src={movie.Poster} alt={`${movie.Title} Poster`} />
        <div className="details-overview">
          <h2>{movie.Title}</h2>
          <p>
            {movie.Release} &bull; {movie.Runtime}
          </p>
          <p>{movie.Genre}</p>
          <p>
            <span>⭐️</span>
            {movie.imdbRating}
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          <StarRating
            defaultRating={movie.userRating}
            onSetRating={handleRating}
            size="1.8"
          />
          <button className="btn-add" onClick={() => setWatched(movie)}>
            Add To Watched List
          </button>
        </div>
        <p>
          <em>{movie.Plot}</em>
        </p>
        <p>Starring {movie.Actors}</p>
        <p>Director {movie.Director}</p>
        {children}
      </section>
    </div>
  );
}
