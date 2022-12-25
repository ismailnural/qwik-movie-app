import { Resource, component$, ResourceReturn } from '@builder.io/qwik';
import { MovieResponseType } from '../../api/types';
import { convertMinsToHrsMins, getYear, getDate } from '../../utils';
import Poster from '../../components/poster';
import BackdropPoster from '../../components/backdrop-poster';

export default component$(({ resource }: { resource: ResourceReturn<MovieResponseType> }) => {
  return (
    <Resource
      value={resource}
      onResolved={(movies) => (
        <BackdropPoster posterPath={movies?.poster_path}>
          <div class="flex sm:flex-col flex-1 m-auto w-full max-w-screen-xl justify-center my-8 sm:my-16 px-3 sm:px-5 xl:px-0">
            <div class="grid grid-rows-1 sm:grid-cols-[300px,auto] gap-8 text-white">
              <div class="w-[300px] m-auto rounded overflow-hidden shadow-lg shadow-black">
                <Poster posterPath={movies?.poster_path} size="medium" />
              </div>
              <div class="flex flex-col">
                <h1 class="font-semibold text-4xl">
                  {movies?.title}{' '}
                  {movies?.release_date && <span class="font-thin">({getYear(movies?.release_date)})</span>}
                </h1>
                <div class="font-light mt-1">
                  {movies?.release_date && <span>{getDate(movies?.release_date)}</span>}
                  <span class="before:content-['\2022'] before:p-2">
                    {movies?.genres && movies?.genres?.map((genre) => genre.name).join(', ')}
                  </span>
                  {movies?.runtime && (
                    <span class="before:content-['\2022'] before:p-2">{convertMinsToHrsMins(movies?.runtime)}</span>
                  )}
                </div>
                <div class="mt-8">
                  {movies?.tagline && <h3 class="font-thin italic text-lg text-gray-400">{movies?.tagline}</h3>}
                  {movies?.overview && (
                    <>
                      <h3 class="text-xl mt-8">Overview</h3>
                      <div class="font-light mt-3">
                        <p>{movies?.overview}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </BackdropPoster>
      )}
    />
  );
});
