import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { searchMovies } from "../services/api";
import { Link } from "react-router-dom";

export default function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async (newQuery, page = 1) => {
    try {
      setLoading(true);
      setError("");
      setQuery(newQuery);
      const data = await searchMovies(newQuery, page);
      setMovies(data.results);
      setCurrentPage(data.page);
      setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
    } catch (err) {
      console.error(err);
      setError("Erro ao buscar filmes. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    handleSearch(query, page);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">🎬 Busca de Filmes</h1>
      <SearchBar onSearch={(q) => handleSearch(q, 1)} />

      {loading && <p className="text-center mt-4">Carregando...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {movies.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="card overflow-hidden"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=Sem+Imagem"
              }
              alt={movie.title}
              className="w-full rounded-t-xl"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold truncate">{movie.title}</h2>
              <p className="text-gray-500 text-sm mb-2">
                {movie.release_date?.slice(0, 4) || "N/A"}
              </p>
              <span className="inline-block btn-primary text-sm px-3 py-1">
                Ver detalhes
              </span>
            </div>
          </Link>
        ))}
      </div>

      {movies.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

