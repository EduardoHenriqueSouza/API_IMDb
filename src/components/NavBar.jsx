import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

const Navbar = () => {
  const { favorites } = useFavorites();

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>MovieApp</Link>
      <Link to="/favorites" style={styles.favoritesButton}>
        Favoritos ({favorites.length})
      </Link>
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
  },
  favoritesButton: {
    backgroundColor: "#e03b3b",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    textDecoration: "none",
  },
};

export default Navbar;
