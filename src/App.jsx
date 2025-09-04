import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SearchPage from "./pages/SearchPage";
import DetailsPage from "./pages/DetailsPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SearchPage />} />
          <Route path="/movie/:id" element={<DetailsPage />} />
          <Route path="/favoritos" element={<h1>Favoritos em breve...</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}
