import { useSearchParams } from "react-router-dom";

import { MovieCard } from "../../components/MovieCard/MovieCard";
import { useSearchMoviesQuery } from "../../features/movies/moviesApi";
import styles from "./SearchPage.module.css";

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("query") ?? "").trim();
  const { data, isFetching, isError } = useSearchMoviesQuery(query, {
    skip: !query
  });

  if (!query) {
    return (
      <section className={styles.emptyState}>
        <h1>Search movies</h1>
        <p>Введите название фильма в поле поиска сверху и нажмите Search.</p>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className={styles.heading}>
        <p className={styles.kicker}>Search results</p>
        <h1>Results for "{query}"</h1>
        <p>
          {isFetching
            ? "Ищем фильмы по запросу..."
            : `Найдено ${data?.total_results ?? 0} фильмов по запросу.`}
        </p>
      </div>

      {isError && (
        <div className={styles.message}>
          Не удалось загрузить фильмы. Проверьте API key и повторите запрос.
        </div>
      )}

      {!isFetching && !isError && data?.results.length === 0 && (
        <div className={styles.message}>По этому запросу ничего не найдено.</div>
      )}

      <div className={styles.grid}>
        {data?.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
