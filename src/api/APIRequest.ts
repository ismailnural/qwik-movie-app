import { APIClient, APIUrls } from './index'
import { MoviesResponseType, MovieResponseType, MoviesResquestType, MovieVideosResponseType } from './types'

export const getPopularMovies = (params: MoviesResquestType) => {
  return APIClient.get<MoviesResponseType>(APIUrls.popularMovies, { params }).then(({ data }) => data).catch((err) => { console.log('err: ', err) });
};

export const getMovie = (id: string) => {
  return APIClient.get<MovieResponseType>(APIUrls.movie(id)).then(({ data }) => data).catch((err) => { console.log('err: ', err) });
};

export const getSimilarMovies = (id: string) => {
  return APIClient.get<MoviesResponseType>(APIUrls.similarMovies(id)).then(({ data: { results } }) => results).catch((err) => { console.log('err: ', err) });
};
export const getMovieVideos = (id: string) => {
  return APIClient.get<MovieVideosResponseType>(APIUrls.movieVideos(id)).then(({ data: { results } }) => results).catch((err) => { console.log('err: ', err) });
};

export default {
  getPopularMovies,
  getMovie,
  getSimilarMovies,
  getMovieVideos,
}