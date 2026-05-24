import { Link, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleFavorite } from "../../features/favorites/favoritesSlice";
import { getMovieImage } from "../../features/movies/image";
import { useGetMovieDetailsQuery } from "../../features/movies/moviesApi";
import styles from "./MovieDetailsPage.module.css";

function formatRuntime(runtime: number | null) {
  if (!runtime) {
    return "Runtime unknown";
  }

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  return `${hours}h ${minutes}m`;
}

export function MovieDetailsPage() {
  const { movieId } = useParams();
  const numericMovieId = Number(movieId);
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) => state.favorites.ids.includes(numericMovieId));
  const { data: movie, isFetching, isError } = useGetMovieDetailsQuery(numericMovieId, {
    skip: Number.isNaN(numericMovieId)
  });

  if (Number.isNaN(numericMovieId)) {
    return (
      <section className={styles.state}>
        <h1>Movie not found</h1>
        <Link to="/">Back to main</Link>
      </section>
    );
  }

  if (isFetching) {
    return (
      <section className={styles.state}>
        <h1>Loading movie...</h1>
      </section>
    );
  }

  if (isError || !movie) {
    return (
      <section className={styles.state}>
        <h1>Could not load movie</h1>
        <Link to="/">Back to main</Link>
      </section>
    );
  }

  const backdrop = getMovieImage(movie.backdrop_path, "original");
  const poster = getMovieImage(movie.poster_path, "w500");

  return (
    <section className={styles.page}>
      <div
        className={styles.hero}
        style={
          backdrop
            ? {
                backgroundImage: `linear-gradient(90deg, rgba(7, 17, 32, 0.95), rgba(7, 17, 32, 0.62)), url(${backdrop})`
              }
            : undefined
        }
      >
        <div className={styles.posterWrap}>
          {poster ? <img className={styles.poster} src={poster} alt={movie.title} /> : <div>No poster</div>}
        </div>

        <div className={styles.content}>
          <p className={styles.kicker}>{movie.status}</p>
          <h1>{movie.title}</h1>
          {movie.tagline && <p className={styles.tagline}>{movie.tagline}</p>}

          <div className={styles.meta}>
            <span>{movie.release_date || "TBA"}</span>
            <span>{formatRuntime(movie.runtime)}</span>
            <span className={styles.rating}>Rating {movie.vote_average.toFixed(1)}</span>
          </div>

          <p className={styles.overview}>{movie.overview || "No overview available yet."}</p>

          <div className={styles.genres}>
            {movie.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>

          <button
            className={isFavorite ? `${styles.favoriteButton} ${styles.favoriteActive}` : styles.favoriteButton}
            type="button"
            aria-pressed={isFavorite}
            onClick={() => dispatch(toggleFavorite(movie.id))}
          >
            ❤️ Любимые
          </button>
        </div>
      </div>
    </section>
  );
}
