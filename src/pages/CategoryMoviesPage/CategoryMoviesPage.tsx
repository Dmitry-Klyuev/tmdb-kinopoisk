import { MovieCard } from "../../components/MovieCard/MovieCard";
import { useGetPopularMoviesQuery } from "../../features/movies/moviesApi";
import styles from "./CategoryMoviesPage.module.css";

export function CategoryMoviesPage() {
  const { data, isFetching, isError } = useGetPopularMoviesQuery(1);
  const movies = data?.results ?? [];

  return (
    <section className={styles.page}>
      <div className={styles.heading}>
        <p className={styles.kicker}>Category movies</p>
        <h1>Popular Movies</h1>
      </div>

      {isFetching && <p className={styles.status}>Loading popular movies...</p>}
      {isError && <p className={styles.status}>Could not load popular movies.</p>}

      <div className={styles.grid}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
