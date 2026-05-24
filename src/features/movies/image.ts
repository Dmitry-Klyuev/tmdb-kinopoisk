const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export function getMovieImage(path: string | null, size: "w342" | "w500" | "w780" | "original") {
  if (!path) {
    return null;
  }

  return `${IMAGE_BASE_URL}/${size}${path}`;
}
