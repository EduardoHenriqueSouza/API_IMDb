import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../api/tmdb";
import { useFavorites } from "../hooks/useFavorites";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const toggleFavorite = () => {
    if (!movie) return;
    isFavorite(movie.id) ? removeFavorite(movie.id) : addFavorite(movie);
  };

  const handleGoBack = () => {
    navigate(-1); // volta para a página anterior
  };

  if (loading) return <p style={{ textAlign: "center" }}>Carregando...</p>;
  if (error) return <p style={{ textAlign: "center" }}>{error}</p>;
  if (!movie) return null;

  const director = movie.credits?.crew.find(c => c.job === "Director")?.name || "Desconhecido";
  const cast = movie.credits?.cast.slice(0, 5).map(c => c.name).join(", ") || "Não disponível";

  return (
    <div className="movie-details">
      <div className="top-bar">
        <button onClick={handleGoBack} className="back-button">← Voltar</button>
      </div>

      <div className="details-container">
        <img
          src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "https://via.placeholder.com/500x750"}
          alt={movie.title}
          className="poster"
        />

        <div className="info">
          <h2>{movie.title}</h2>
          <p><strong>Diretor:</strong> {director}</p>
          <p><strong>Elenco:</strong> {cast}</p>
          <p>{movie.overview}</p>
          <button onClick={toggleFavorite} className="favorite-button">
            {isFavorite(movie.id) ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
