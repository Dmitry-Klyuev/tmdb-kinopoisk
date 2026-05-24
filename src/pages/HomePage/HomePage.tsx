import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import { MovieCard } from "../../components/MovieCard/MovieCard";
import { getMovieImage } from "../../features/movies/image";
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery
} from "../../features/movies/moviesApi";
import styles from "./HomePage.module.css";

export function HomePage() {
  const { data, isFetching, isError } = useGetPopularMoviesQuery();
  const { data: topRatedData, isFetching: isTopRatedFetching, isError: isTopRatedError } = useGetTopRatedMoviesQuery();
  const { data: upcomingData, isFetching: isUpcomingFetching, isError: isUpcomingError } = useGetUpcomingMoviesQuery();
  const {
    data: nowPlayingData,
    isFetching: isNowPlayingFetching,
    isError: isNowPlayingError
  } = useGetNowPlayingMoviesQuery();
  const [featuredMovieId, setFeaturedMovieId] = useState<number | null>(null);

  const movieSections = [
    {
      kicker: "Highest rated",
      title: "Top Rated Movies",
      data: topRatedData,
      isFetching: isTopRatedFetching,
      isError: isTopRatedError
    },
    {
      kicker: "Coming soon",
      title: "Upcoming Movies",
      data: upcomingData,
      isFetching: isUpcomingFetching,
      isError: isUpcomingError
    },
    {
      kicker: "In theatres",
      title: "Now Playing Movies",
      data: nowPlayingData,
      isFetching: isNowPlayingFetching,
      isError: isNowPlayingError
    }
  ];

  const moviesWithBackdrop = useMemo(
    () => data?.results.filter((movie) => movie.backdrop_path) ?? [],
    [data]
  );

  useEffect(() => {
    if (moviesWithBackdrop.length === 0) {
      return;
    }

    const randomMovie = moviesWithBackdrop[Math.floor(Math.random() * moviesWithBackdrop.length)];
    setFeaturedMovieId(randomMovie.id);
  }, [moviesWithBackdrop]);

  const featuredMovie =
    moviesWithBackdrop.find((movie) => movie.id === featuredMovieId) ?? moviesWithBackdrop[0] ?? null;

  const backdropUrl = getMovieImage(featuredMovie?.backdrop_path ?? null, "original");

  return (
    <section className={styles.page}>
      <div
        className={styles.hero}
        style={
          backdropUrl
            ? {
                backgroundImage: `linear-gradient(180deg, rgba(8, 15, 32, 0.2), rgba(8, 15, 32, 0.88)), url(${backdropUrl})`
              }
            : undefined
        }
      >
        <div className={styles.overlay} />
        <div className={styles.heroContent}>
          <p className={styles.kicker}>Popular movies</p>
         

          {isFetching && <p className={styles.status}>Загружаем популярные фильмы...</p>}
          {isError && <p className={styles.status}>Не удалось загрузить список популярных фильмов.</p>}

          {featuredMovie && (
            <div className={styles.featuredCard}>
              <div className={styles.featuredMeta}>
                <span>{featuredMovie.release_date ? featuredMovie.release_date.slice(0, 4) : "TBA"}</span>
                <span>Rating {featuredMovie.vote_average.toFixed(1)}</span>
              </div>
              <h2>{featuredMovie.title}</h2>
              <p>{featuredMovie.overview}</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.kicker}>Popular now</p>
            <h2>Popular Movies</h2>
          </div>
          <Link className={styles.viewMore} to="/movies/popular">
            View More
          </Link>
        </div>

        <div className={styles.grid}>
          {(data?.results ?? []).slice(0, 6).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>

      {movieSections.map((section) => (
        <div className={styles.section} key={section.title}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>{section.kicker}</p>
              <h2>{section.title}</h2>
            </div>
          </div>

          {section.isFetching && <p className={styles.sectionStatus}>Loading movies...</p>}
          {section.isError && <p className={styles.sectionStatus}>Could not load movies.</p>}

          <div className={styles.grid}>
            {(section.data?.results ?? []).slice(0, 6).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
