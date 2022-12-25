import { Resource, component$, ResourceReturn } from '@builder.io/qwik';
import { MovieResponseType } from '../../api/types';
import MovieCard from '../movie-card';
import PageTitle from '../page-title';

export default component$(({ resource }: { resource: ResourceReturn<MovieResponseType[]> }) => {
  return (
    <Resource
      value={resource}
      onResolved={(movies) => (
        <div class="flex flex-col m-auto max-w-screen-xl justify-center my-9">
          <PageTitle title="Similar Movies" />
          <div class="mt-5 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {movies && movies.map((item) => <MovieCard key={item.id} item={item} />)}
          </div>
        </div>
      )}
    />
  );
});
