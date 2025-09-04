import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/api";

export default function DetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar detalhes do filme.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <p className="text-center mt-6">Carregando...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="card max-w-5xl mx-auto p-6">
      <Link
        to="/"
        className="text-blue-600 hover:underline mb-4 inline-block font-medium"
      >
        ← Voltar
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w400${movie.poster_path}`
              : "https://via.placeholder.com/400x600?text=Sem+Imagem"
          }
          alt={movie.title}
          className="rounded-xl shadow-lg w-full md:w-1/3"
        />

        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-500 text-lg">
            {movie.release_date?.slice(0, 4)} • ⭐ {movie.vote_average}/10
          </p>

          <p className="mt-6 text-gray-700 leading-relaxed">
            {movie.overview || "Sem sinopse disponível."}
          </p>

          <div className="mt-6 space-y-2">
            <p>
              <span className="font-semibold">Diretor:</span>{" "}
              {movie.credits?.crew.find((p) => p.job === "Director")?.name ||
                "Não informado"}
            </p>
            <p>
              <span className="font-semibold">Elenco principal:</span>{" "}
              {movie.credits?.cast
                .slice(0, 5)
                .map((actor) => actor.name)
                .join(", ") || "Não disponível"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
