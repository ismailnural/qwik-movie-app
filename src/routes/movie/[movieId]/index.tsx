import { component$, useResource$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { useLocation } from '@builder.io/qwik-city';
import { APIRequest } from '../../../api';
import { MovieResponseType, MovieVideosResultsType } from '../../../api/types';
import { getYear } from '../../../utils';
import SimilarMovies from '../../../components/similar-movies';
import MovieVideos from '../../../components/movie-videos';
import MovieOverview from '../../../components/movie-overview';

export const onGet = async ({ params }: { params: { movieId: string } }) => {
  return await APIRequest.getMovie(params.movieId);
};

export default component$(() => {
  const location = useLocation();
  const movieId = location.params.movieId;

  const movieDetailsResource = useResource$<MovieResponseType>(async ({ track, cleanup }) => {
    const id = track(() => movieId);
    const abortController = new AbortController();
    cleanup(() => abortController.abort('cleanup'));
    return await APIRequest.getMovie(id);
  });

  const MovieVideosResource = useResource$<MovieVideosResultsType[]>(async ({ track, cleanup }) => {
    const id = track(() => movieId);
    const abortController = new AbortController();
    cleanup(() => abortController.abort('cleanup'));
    const data = await APIRequest.getMovieVideos(id);

    return data
      .filter((video) => ['Teaser', 'Trailer'].includes(video.type))
      .sort((a, b) => {
        if (a.type < b.type) {
          return -1;
        }
        if (a.type > b.type) {
          return 1;
        }
        return 0;
      })
      .reverse();
  });

  const similarMoviesResource = useResource$<MovieResponseType[]>(async ({ track, cleanup }) => {
    const id = track(() => movieId);
    const abortController = new AbortController();
    cleanup(() => abortController.abort('cleanup'));
    return await APIRequest.getSimilarMovies(id);
  });

  return (
    <>
      <MovieOverview resource={movieDetailsResource} />
      <MovieVideos resource={MovieVideosResource} />
      <SimilarMovies resource={similarMoviesResource} />
    </>
  );
});

export const head: DocumentHead<MovieResponseType> = ({ data: movieDetails }) => {
  return {
    title: `${movieDetails?.title} (${getYear(movieDetails?.release_date)}) - ${movieDetails?.tagline}`,
    meta: [
      {
        name: 'description',
        content: movieDetails?.overview,
      },
    ],
  };
};
