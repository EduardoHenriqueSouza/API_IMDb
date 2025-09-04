
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const searchMovies = async (query, page = 1) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}&language=pt-BR`
  );
  if (!res.ok) throw new Error("Erro ao buscar filmes");
  return res.json();
};

export const getMovieDetails = async (id) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits`
  );
  if (!res.ok) throw new Error("Erro ao buscar detalhes do filme");
  return res.json();
};