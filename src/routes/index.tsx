import { Resource, component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { useEndpoint } from '@builder.io/qwik-city';
import { APIRequest } from '../api';
import { MoviesResponseType } from '../api/types';
import MovieCard from '../components/movie-card';
import Pagination from '../components/pagination';
import PageTitle from '../components/page-title';

export const onGet = async ({ url }: { url: { searchParams: URLSearchParams } }) => {
  const page = url?.searchParams.get('page') ?? '1';
  return await APIRequest.getPopularMovies({ page });
};

export default component$(() => {
  const movieData = useEndpoint<MoviesResponseType>();

  return (
    <Resource
      value={movieData}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(movie) => (
        <>
          <div class="flex flex-col m-auto max-w-screen-xl justify-center my-9">
            <PageTitle
              title={movie?.total_results > 0 ? `Popular Movies (${movie?.total_results})` : 'Popular Movies '}
            />
            <div class="mt-5 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {movie?.results && movie?.results.map((item) => <MovieCard key={item.id} item={item} />)}
            </div>
            <Pagination currentPage={movie?.page} totalPages={movie?.total_pages} />
          </div>
        </>
      )}
    />
  );
});

export const head: DocumentHead<{ page: number }> = ({ data }) => {
  return {
    title: data?.page > 1 ? `qMovie Popular Movies - Page: ${data?.page}` : 'qMovie Popular Movies',
    meta: [
      {
        name: 'description',
        content: 'qMovie Popular Movies',
      },
    ],
  };
};
