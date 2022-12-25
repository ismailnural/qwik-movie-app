import { Resource, component$, useResource$, useContext } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { SearchContext } from '../contexts';
import { APIRequest } from '../api';
import { MoviesResponseType } from '../api/types';
import MovieCard from '../components/movie-card';
import Pagination from '../components/pagination';
import PageTitle from '../components/page-title';
import SearchBar from '../components/search-bar';

export const onGet = async ({ url }: { url: { searchParams: URLSearchParams } }) => {
  const page = url?.searchParams.get('page') ?? '1';

  return { page };
};

export default component$(() => {
  const state = useContext(SearchContext);

  const movieDataResource = useResource$<MoviesResponseType>(async ({ track, cleanup }) => {
    const page = track(() => state.page);
    const query = track(() => state.query);
    const abortController = new AbortController();
    cleanup(() => abortController.abort('cleanup'));
    return await APIRequest.getPopularMovies({ page: `${page}`, query });
  });

  const pageTitle = (total: number) => {
    if (state.query) {
      return `Search for: ${state.query} ${total > 0 ? `(${total})` : ''}`;
    }
    return `Popular Movies ${total > 0 ? `(${total})` : ''}`;
  };
  return (
    <>
      <SearchBar />
      <Resource
        value={movieDataResource}
        onResolved={(movie) => (
          <div class="flex items-center justify-center px-3 sm:px-5 pt-3 pb-10">
            <div class="flex flex-col max-w-screen-xl">
              <PageTitle title={pageTitle(movie?.total_results)} />
              <div class="mt-5 grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-4">
                {movie?.results && movie?.results.map((item) => <MovieCard key={item.id} item={item} />)}
              </div>
              <Pagination currentPage={movie?.page} totalPages={movie?.total_pages} />
            </div>
          </div>
        )}
      />
    </>
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
