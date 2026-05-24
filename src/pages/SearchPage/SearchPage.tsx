import { useSearchParams } from "react-router-dom";

import { getMovieImage } from "../../features/movies/image";
import { useSearchMoviesQuery } from "../../features/movies/moviesApi";
import styles from "./SearchPage.module.css";

function formatReleaseYear(date: string) {
  return date ? date.slice(0, 4) : "TBA";
}

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
        {data?.results.map((movie) => {
          const poster = getMovieImage(movie.poster_path, "w500");

          return (
            <article key={movie.id} className={styles.card}>
              <div className={styles.posterWrap}>
                {poster ? (
                  <img className={styles.poster} src={poster} alt={movie.title} loading="lazy" />
                ) : (
                  <div className={styles.posterFallback}>No poster</div>
                )}
              </div>

              <div className={styles.cardBody}>
                <div className={styles.metaRow}>
                  <span>{formatReleaseYear(movie.release_date)}</span>
                  <span>Rating {movie.vote_average.toFixed(1)}</span>
                </div>
                <h2>{movie.title}</h2>
                <p>{movie.overview || "Описание для этого фильма пока отсутствует."}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
