export const APIUrls = {
  popularMovies: 'discover/movie',
  movie: (id: string) => `movie/${id}`,
  similarMovies: (id: string) => `movie/${id}/similar`,
  movieVideos: (id: string) => `movie/${id}/videos`,
  searchMovie: 'search/movie',
} as const;

export default APIUrls;
