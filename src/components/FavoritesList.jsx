import React from "react";
import MovieCard from "./MovieCard";
import { useFavorites } from "../hooks/useFavorites";

const FavoritesList = () => {
  const { favorites, removeFavorite, isFavorite } = useFavorites();

  const toggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    }
  };

  if (favorites.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Nenhum filme favorito ainda.</p>;
  }

  return (
    <div className="movies-grid">
      {favorites.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleFavorite={toggleFavorite}
          isFav={isFavorite(movie.id)}
        />
      ))}
    </div>
  );
};

export default FavoritesList;
