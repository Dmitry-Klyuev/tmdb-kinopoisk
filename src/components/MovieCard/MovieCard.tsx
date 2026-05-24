import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleFavorite } from "../../features/favorites/favoritesSlice";
import { getMovieImage } from "../../features/movies/image";
import type { Movie } from "../../features/movies/types";
import styles from "./MovieCard.module.css";

type MovieCardProps = {
  movie: Movie;
};

export function MovieCard({ movie }: MovieCardProps) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) => state.favorites.movies.some((item) => item.id === movie.id));
  const poster = getMovieImage(movie.poster_path, "w500");
  const rating = movie.vote_average.toFixed(1);
  const ratingClass =
    movie.vote_average >= 7 ? styles.ratingHigh : movie.vote_average >= 5 ? styles.ratingMedium : styles.ratingLow;

  return (
    <article className={styles.card}>
      <Link className={styles.movieLink} to={`/movie/${movie.id}`} aria-label={`Open ${movie.title}`}>
        <div className={styles.posterWrap}>
          {poster ? (
            <img className={styles.poster} src={poster} alt={movie.title} loading="lazy" />
          ) : (
            <div className={styles.posterFallback}>No poster</div>
          )}
          <span className={`${styles.ratingBadge} ${ratingClass}`}>{rating}</span>
        </div>

        <div className={styles.cardBody}>
          <div className={styles.cardMeta}>
            <span>{movie.release_date ? movie.release_date.slice(0, 4) : "TBA"}</span>
          </div>
          <h3>{movie.title}</h3>
          <p>{movie.overview || "No overview available yet."}</p>
        </div>
      </Link>

      <button
        className={isFavorite ? `${styles.favoriteButton} ${styles.favoriteActive}` : styles.favoriteButton}
        type="button"
        aria-pressed={isFavorite}
        aria-label={isFavorite ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
        onClick={() => dispatch(toggleFavorite(movie))}
      >
        <span aria-hidden="true">❤️</span>
        <span className={styles.favoriteText}>Любимые</span>
      </button>
    </article>
  );
}
