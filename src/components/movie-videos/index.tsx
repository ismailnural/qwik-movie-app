import { Resource, component$, ResourceReturn } from '@builder.io/qwik';
import { MovieVideosResultsType } from '../../api/types';
import PageTitle from '../page-title';

export default component$(({ resource }: { resource: ResourceReturn<MovieVideosResultsType[]> }) => {
  return (
    <Resource
      value={resource}
      onResolved={(movies) => (
        <div class="px-3 sm:px-5 my-9 w-full">
          <div class="flex flex-col flex-1 max-w-screen-xl m-auto">
            <PageTitle title="Videos" />
            <div class="flex rounded-xl max-w-fit overflow-x-scroll mt-4 mb-6">
              {movies &&
                movies.map((video) => {
                  return (
                    <div key={video.id}>
                      <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube-nocookie.com/embed/${video?.key}`}
                        title={video?.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    />
  );
});
