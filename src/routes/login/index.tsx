import { component$, useContext, useStore, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { useNavigate } from '@builder.io/qwik-city';
import { AuthContext } from '../../contexts';

export default component$(() => {
  const nav = useNavigate();
  const state = useContext(AuthContext);
  const store = useStore({
    username: '',
    password: '',
  });

  useTask$(({ track }) => {
    track(() => state?.isLoggedIn);

    if (state?.isLoggedIn) {
      nav.path = '/';
    }
  });

  return (
    <>
      <div class="w-full max-w-xl m-auto p-3 sm:p-6">
        <div class="text-gray-800 text-center mb-6">
          <div class="font-bold text-3xl">
            qMovie
            <span class="text-red-600">.</span>
          </div>
        </div>
        <div class="w-full bg-white rounded-lg shadow p-4 sm:p-16 pt-8 sm:pt-12">
          <h2 class="text-center text-2xl font-semibold tracking-tight text-gray-900 mb-8 sm:mb-12">
            Sign in to your account
          </h2>
          <div class="mb-6">
            <label for="username" class="inline-block text-md font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Username"
              onChange$={(e) => (store.username = (e?.target as HTMLInputElement)?.value)}
            />
            <span class="block text-xs text-gray-400 mt-1">Demo</span>
          </div>

          <div class="mb-6">
            <label for="password" class="inline-block text-md font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Password"
              onChange$={(e) => (store.password = (e?.target as HTMLInputElement)?.value)}
            />
            <span class="text-xs text-gray-400 mt-1">Demo</span>
          </div>

          <button
            type="button"
            class="inline-block mt-6 px-8 py-3 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded-full hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-full disabled:pointer-events-none disabled:cursor-default disabled:opacity-75"
            disabled={store.username === '' || store.password === ''}
            onClick$={() => {
              state.isLoggedIn = true;
              state.username = store.username;
              nav.path = '/';
            }}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = () => {
  return {
    title: 'Login',
    meta: [
      {
        name: 'description',
        content: 'Login - qMovie',
      },
    ],
  };
};
