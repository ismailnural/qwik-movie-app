import { component$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';

export default component$(({ currentPage = 1, totalPages = 1 }: { currentPage: number; totalPages: number }) => {
  const nav = useNavigate();

  return (
    <div class="flex items-center space-x-2 fill-gray-500 pt-8 pb-2 m-auto">
      <button
        onClick$={() => {
          if (currentPage > 1) {
            nav.path = `?page=${currentPage - 1}`;
          }
        }}
        class="h-7 w-7 rounded-full border p-1 enabled:hover:border-red-600 enabled:hover:fill-red-600 enabled:hover:cursor-pointer focus:outline-none disabled:opacity-75"
        disabled={currentPage === 1}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M13.293 6.293L7.58 12l5.7 5.7 1.41-1.42 -4.3-4.3 4.29-4.293Z"></path>
        </svg>
      </button>
      <button
        onClick$={() => {
          if (currentPage < totalPages && currentPage !== 500) {
            nav.path = `?page=${currentPage + 1}`;
          }
        }}
        class="h-7 w-7 rounded-full border p-1 enabled:hover:border-red-600 enabled:hover:fill-red-600 enabled:hover:cursor-pointer focus:outline-none disabled:opacity-75"
        disabled={currentPage >= totalPages}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M10.7 17.707l5.7-5.71 -5.71-5.707L9.27 7.7l4.29 4.293 -4.3 4.29Z"></path>
        </svg>
      </button>
    </div>
  );
});
