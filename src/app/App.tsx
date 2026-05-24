import { Navigate, Route, Routes } from "react-router-dom";

import { AppShell } from "../components/AppShell/AppShell";
import { CategoryMoviesPage } from "../pages/CategoryMoviesPage/CategoryMoviesPage";
import { HomePage } from "../pages/HomePage/HomePage";
import { MovieDetailsPage } from "../pages/MovieDetailsPage/MovieDetailsPage";
import { SearchPage } from "../pages/SearchPage/SearchPage";

export function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/popular" element={<CategoryMoviesPage />} />
        <Route path="/filtered-movies" element={<HomePage />} />
        <Route path="/favorites" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
