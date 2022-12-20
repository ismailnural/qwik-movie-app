import { component$ } from '@builder.io/qwik'
import { MovieResponseType } from '../../api/types'
import MovieCard from '../movie-card'
import PageTitle from '../page-title'

export default component$(
  ({ similarMovies }: { similarMovies?: MovieResponseType[] }) => {
    return similarMovies ? (
      <div class='flex flex-col m-auto max-w-screen-xl justify-center my-9'>
        <PageTitle title='Similar Movies' />
        <div class='mt-5 grid grid-cols-2 gap-6 sm:grid-cols-4'>
          {similarMovies.map((item) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    ) : (
      <></>
    )
  }
)
