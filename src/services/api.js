import axios from "axios";

const API_KEY = "a3161560fdd2b2a32f34edb0d5357daa";
const BASE_URL = "https://api.themoviedb.org/3";

export const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "pt-BR",
  },
});

// Função de busca
export const searchMovies = async (query, page = 1) => {
  const response = await api.get("/search/movie", {
    params: { query, page },
  });
  return response.data;
};

// Buscar detalhes de um filme
export const getMovieDetails = async (id) => {
  const response = await api.get(`/movie/${id}`, {
    params: { append_to_response: "credits" }, 
    // credits = elenco e equipe
  });
  return response.data;
};