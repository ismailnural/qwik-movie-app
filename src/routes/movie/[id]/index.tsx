import { Resource, component$ } from '@builder.io/qwik';
import type { DocumentHead, RequestHandler } from '@builder.io/qwik-city';
import { useEndpoint } from '@builder.io/qwik-city';
import { APIRequest } from '../../../api';
import { MovieResponseType, MovieVideosResultsType } from '../../../api/types';
import { convertMinsToHrsMins, getYear, getDate } from '../../../utils';
import Poster from '../../../components/poster';
import BackdropPoster from '../../../components/backdrop-poster';
import SimilarMovies from '../../../components/similar-movies';
import MovieVideos from '../../../components/movie-videos';

type MovieDetailResponseType = {
  movieDetails?: MovieResponseType;
  similarMovies?: MovieResponseType[];
  movieVideos?: MovieVideosResultsType[];
};

export const onGet: RequestHandler<MovieDetailResponseType> = async ({ params }) => {
  const movieDetails = (await APIRequest.getMovie(params.id)) ?? undefined;
  const movieVideos = (await APIRequest.getMovieVideos(params.id)) ?? undefined;
  const similarMovies = (await APIRequest.getSimilarMovies(params.id)) ?? undefined;

  return {
    movieDetails,
    similarMovies,
    movieVideos,
  };
};

export default component$(() => {
  const response = useEndpoint<typeof onGet>();

  return (
    <Resource
      value={response}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={({ movieDetails, similarMovies, movieVideos }) => {
        return (
          <>
            <BackdropPoster posterPath={movieDetails?.poster_path}>
              <div class="flex flex-col flex-1 m-auto max-w-screen-xl justify-center my-16">
                <div class="grid grid-cols-[300px,auto] gap-8 text-white">
                  <div class="w-[300px] rounded overflow-hidden shadow-lg shadow-black">
                    <Poster posterPath={movieDetails?.poster_path} size="medium" />
                  </div>
                  <div class="flex flex-col">
                    <h1 class="font-semibold text-4xl">
                      {movieDetails?.title} <span class="font-thin">({getYear(movieDetails?.release_date)})</span>
                    </h1>
                    <div class="font-light mt-1">
                      <span>{getDate(movieDetails?.release_date)}</span>
                      <span class="before:content-['\2022'] before:p-2">
                        {movieDetails?.genres?.map((genre) => genre.name).join(', ')}
                      </span>
                      <span class="before:content-['\2022'] before:p-2">
                        {convertMinsToHrsMins(movieDetails?.runtime)}
                      </span>
                    </div>
                    <div class="mt-8">
                      {movieDetails?.tagline && (
                        <h3 class="font-thin italic text-lg text-gray-400">{movieDetails?.tagline}</h3>
                      )}
                      {movieDetails?.overview && (
                        <>
                          <h3 class="text-xl mt-8">Overview</h3>
                          <div class="font-light mt-3">
                            <p>{movieDetails?.overview}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </BackdropPoster>
            {movieVideos && <MovieVideos movieVideos={movieVideos} />}
            {similarMovies && <SimilarMovies similarMovies={similarMovies} />}
          </>
        );
      }}
    />
  );
});

export const head: DocumentHead<typeof onGet> = ({ data: { movieDetails } }) => {
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
