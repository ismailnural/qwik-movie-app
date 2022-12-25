import { component$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { getDate } from '../../utils';
import Poster from '../poster';
import CircularChart from '../circular-chart';

export default component$(
  ({
    item,
  }: {
    item: {
      id: number;
      title: string;
      release_date: string;
      poster_path: string;
      vote_average: number;
    };
  }) => {
    const nav = useNavigate();

    return (
      <a
        preventdefault:click
        onClick$={() => {
          nav.path = `/movie/${item.id}`;
        }}
        class="flex flex-col rounded-xl overflow-hidden border hover:opacity-60 transition-all"
      >
        <Poster posterPath={item.poster_path} size="large" />
        <div class="bg-white p-4 pt-7 flex flex-col border-t-2 border-t-red-600 relative">
          <CircularChart percentage={item.vote_average * 10} />
          <span class="capitalize font-medium truncate">{item.title}</span>
          <span class="font-light text-gray-400 pt-2 text-sm truncate">{getDate(item?.release_date)}</span>
        </div>
      </a>
    );
  },
);
