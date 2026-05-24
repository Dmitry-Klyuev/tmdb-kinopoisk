import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { MovieDetails, MoviesResponse } from "./types";

const API_KEY = (import.meta.env.VITE_API_KEY || import.meta.env.VITE_TMDB_API_KEY);
const isBearerToken = API_KEY.startsWith("eyJ");
const authParams = isBearerToken ? {} : { api_key: API_KEY };

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    prepareHeaders: (headers) => {
      if (isBearerToken) {
        headers.set("Authorization", `Bearer ${API_KEY}`);
      }

      return headers;
    }
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query<MoviesResponse, number | void>({
      query: (page = 1) => ({
        url: "movie/popular",
        params: {
          ...authParams,
          language: "en-US",
          page
        }
      })
    }),
    getTopRatedMovies: builder.query<MoviesResponse, number | void>({
      query: (page = 1) => ({
        url: "movie/top_rated",
        params: {
          ...authParams,
          language: "en-US",
          page
        }
      })
    }),
    getUpcomingMovies: builder.query<MoviesResponse, number | void>({
      query: (page = 1) => ({
        url: "movie/upcoming",
        params: {
          ...authParams,
          language: "en-US",
          page
        }
      })
    }),
    getNowPlayingMovies: builder.query<MoviesResponse, number | void>({
      query: (page = 1) => ({
        url: "movie/now_playing",
        params: {
          ...authParams,
          language: "en-US",
          page
        }
      })
    }),
    getMovieDetails: builder.query<MovieDetails, number>({
      query: (movieId) => ({
        url: `movie/${movieId}`,
        params: {
          ...authParams,
          language: "en-US"
        }
      })
    }),
    searchMovies: builder.query<MoviesResponse, string>({
      query: (query) => ({
        url: "search/movie",
        params: {
          ...authParams,
          query,
          include_adult: false,
          language: "en-US",
          page: 1
        }
      })
    })
  })
});

export const {
  useGetMovieDetailsQuery,
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useSearchMoviesQuery
} = moviesApi;
