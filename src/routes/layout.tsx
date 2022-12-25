import { component$, Slot, useContextProvider, useStore } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { AuthContext, AuthState, SearchContext, SearchState } from '../contexts';
import Header from '../components/header';

export default component$(() => {
  const location = useLocation();
  const currentPage = location.query.page;

  const AuthState = useStore<AuthState>({
    isLoggedIn: false,
    username: undefined,
  });
  const SearchState = useStore<SearchState>({
    query: undefined,
    page: currentPage ? +currentPage : 1,
  });

  useContextProvider(AuthContext, AuthState);
  useContextProvider(SearchContext, SearchState);

  return (
    <>
      <main class="flex flex-col flex-1 min-h-full">
        <Header />
        <section class="flex flex-col flex-1 min-h-full">
          <Slot />
        </section>
      </main>
      <footer>
        <div class="flex flex-1 justify-center px-5 py-6 bg-slate-900 text-white">
          <div class="flex flex-1 flex-col sm:flex-row items-center max-w-screen-xl justify-between font-thin text-sm text-center border-1 gap-2">
            Copyright © 2022, ismail nural. All Rights Reserved
            <div class="font-thin text-sm">
              <a href="mailto:ismail.nural@adesso.com.tr" target="_blank" class="hover:text-gray-300">
                ismail.nural@adesso.com.tr
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
});
