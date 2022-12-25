import { component$, useStore, useContext, useTask$ } from '@builder.io/qwik';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import { SearchContext } from '../../contexts';
import { queryBuilder } from '../../utils';

export default component$(() => {
  const location = useLocation();
  const nav = useNavigate();

  const state = useContext(SearchContext);

  const store = useStore({ query: location.query.query });

  useTask$(({ track }) => {
    const currentQuery = track(() => location.query.query);

    if (!currentQuery) {
      state.query = undefined;
    } else {
      state.query = currentQuery;
    }
  });

  return (
    <div class="p-9 bg-white">
      <div class="flex flex-col m-auto max-w-screen-xl justify-center ">
        <div class="relative items-center content-center flex ">
          <span class="text-gray-400 absolute left-4 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search ..."
            name="query"
            value={store.query}
            onInput$={(e) => {
              const value = (e.target as HTMLInputElement).value;
              const newQueryPath = queryBuilder(location.query, { query: value, page: undefined });

              store.query = value;
              nav.path = newQueryPath;
            }}
            class="text-sm ring-1 bg-transparent ring-gray-200 focus:ring-red-300 pl-12 pr-8 py-3 text-gray-600 rounded-full w-full outline-none focus:ring-1"
          />
        </div>
      </div>
    </div>
  );
});
