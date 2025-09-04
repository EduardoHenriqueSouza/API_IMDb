import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

const Navbar = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const handleReset = () => {
    localStorage.removeItem("lastQuery");
    localStorage.removeItem("lastResults");
    localStorage.removeItem("lastPage");

    navigate("/", { replace: true });
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <nav style={styles.nav}>
      <button onClick={handleReset} style={styles.logo}>
        MovieApp
      </button>

      <button
        style={styles.favoritesButton}
        onClick={() => navigate("/favorites")}
      >
        Favoritos ({favorites.length})
      </button>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#1e1e1e",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f80e0",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  favoritesButton: {
    backgroundColor: "#e03b3b",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
  },
};

export default Navbar;
