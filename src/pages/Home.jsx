import React, { useState, useEffect } from "react";
import { searchMovies } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { useFavorites } from "../hooks/useFavorites";

const Home = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  // ✅ Recupera a última busca ao montar o componente
  useEffect(() => {
    const storedQuery = localStorage.getItem("lastQuery");
    const storedResults = localStorage.getItem("lastResults");
    const storedPage = localStorage.getItem("lastPage");

    if (storedQuery && storedResults) {
      setQuery(storedQuery);
      setMovies(JSON.parse(storedResults));
      setPage(storedPage ? parseInt(storedPage) : 1);
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError("");
    try {
      const data = await searchMovies(query, 1);
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setPage(1);

      // ✅ Salva a busca e resultados no localStorage
      localStorage.setItem("lastQuery", query);
      localStorage.setItem("lastResults", JSON.stringify(data.results));
      localStorage.setItem("lastPage", "1");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (newPage) => {
    setLoading(true);
    try {
      const data = await searchMovies(query, newPage);
      setMovies(data.results);
      setPage(newPage);

      // ✅ Atualiza os resultados no localStorage ao mudar de página
      localStorage.setItem("lastResults", JSON.stringify(data.results));
      localStorage.setItem("lastPage", newPage.toString());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (movie) => {
    isFavorite(movie.id) ? removeFavorite(movie.id) : addFavorite(movie);
  };

  return (
    <div className="container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar filmes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onToggleFavorite={toggleFavorite}
            isFav={isFavorite(movie.id)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Home;
