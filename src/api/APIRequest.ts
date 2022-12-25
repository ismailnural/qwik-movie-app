import { APIClient, APIUrls } from './index';
import { MoviesResponseType, MovieResponseType, MoviesResquestType, MovieVideosResponseType } from './types';

export const getPopularMovies = async (params: MoviesResquestType) => {
  return await APIClient.get<MoviesResponseType>(params.query ? APIUrls.searchMovie : APIUrls.popularMovies, {
    params,
  });
};

export const getMovie = async (id: string) => {
  return await APIClient.get<MovieResponseType>(APIUrls.movie(id));
};

export const getSimilarMovies = async (id: string) => {
  return await (
    await APIClient.get<MoviesResponseType>(APIUrls.similarMovies(id))
  ).results;
};

export const getMovieVideos = async (id: string) => {
  return await (
    await APIClient.get<MovieVideosResponseType>(APIUrls.movieVideos(id))
  ).results;
};

export default {
  getPopularMovies,
  getMovie,
  getSimilarMovies,
  getMovieVideos,
};
