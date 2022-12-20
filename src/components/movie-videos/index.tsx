import { component$ } from '@builder.io/qwik';
import { MovieVideosResultsType } from '../../api/types';
import PageTitle from '../page-title';

export default component$(({ movieVideos }: { movieVideos?: MovieVideosResultsType[] }) => {
  return (
    <>
      {movieVideos && (
        <div class="flex flex-col m-auto max-w-screen-xl justify-center my-9">
          <PageTitle title="Videos" />
          <div class="flex rounded-xl overflow-x-scroll mt-4 mb-6 max-w-fit">
            {movieVideos
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
              .reverse()
              .map((video) => {
                return (
                  <div>
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
      )}
    </>
  );
});
