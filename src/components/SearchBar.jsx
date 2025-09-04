import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      onSearch(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 justify-center my-6"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar filmes..."
        className="border border-gray-300 rounded-xl px-4 py-2 w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <button type="submit" className="btn-primary">
        Buscar
      </button>
    </form>
  );
}
