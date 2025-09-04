import React from "react";
import { useFavorites } from "../hooks/useFavorites";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const { favorites, removeFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // volta para a página anterior
  };

  return (
    <div className="container">
      <h2>Meus Favoritos</h2>

      <button onClick={handleGoBack} style={styles.backButton}>
        ⬅ Voltar
      </button>

      {favorites.length === 0 ? (
        <p>Você não tem filmes favoritos ainda.</p>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onToggleFavorite={() => removeFavorite(movie.id)}
              isFav={isFavorite(movie.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  backButton: {
    margin: "1rem 0",
    padding: "0.5rem 1rem",
    backgroundColor: "#1f80e0",
    color: "#fff",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
  },
};

export default Favorites;
