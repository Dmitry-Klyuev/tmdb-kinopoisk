import { getMovieImage } from "../../features/movies/image";
import type { Movie } from "../../features/movies/types";
import styles from "./MovieCard.module.css";

type MovieCardProps = {
  movie: Movie;
};

export function MovieCard({ movie }: MovieCardProps) {
  const poster = getMovieImage(movie.poster_path, "w500");

  return (
    <article className={styles.card}>
      <div className={styles.posterWrap}>
        {poster ? (
          <img className={styles.poster} src={poster} alt={movie.title} loading="lazy" />
        ) : (
          <div className={styles.posterFallback}>No poster</div>
        )}
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <span>{movie.release_date ? movie.release_date.slice(0, 4) : "TBA"}</span>
          <span>Rating {movie.vote_average.toFixed(1)}</span>
        </div>
        <h3>{movie.title}</h3>
        <p>{movie.overview}</p>
      </div>
    </article>
  );
}
