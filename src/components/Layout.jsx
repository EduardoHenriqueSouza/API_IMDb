// src/components/Layout.jsx
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            🎬 MovieApp
          </Link>
          <div className="flex gap-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Buscar
            </Link>
            <Link
              to="/favoritos"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Favoritos
            </Link>
          </div>
        </nav>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 container mx-auto px-6 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-6 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MovieApp. Todos os direitos reservados.
      </footer>
    </div>
  );
}
