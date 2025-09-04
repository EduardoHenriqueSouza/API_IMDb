import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, onToggleFavorite, isFav }) => {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : "https://via.placeholder.com/200x300";

  return (
    <div className="movie-card">
      <img src={poster} alt={movie.title} />
      <h3>{movie.title} ({movie.release_date?.slice(0, 4)})</h3>
      <div>
        <Link to={`/movie/${movie.id}`}>Detalhes</Link>
        <button onClick={() => onToggleFavorite(movie)}>
          {isFav ? "Remover" : "Favorito"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
