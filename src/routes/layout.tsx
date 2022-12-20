import { component$, Slot } from '@builder.io/qwik';
import Header from '../components/header';

export default component$(() => {
  return (
    <>
      <main>
        <Header />
        <section>
          <Slot />
        </section>
      </main>
      <footer>
        <div class="flex flex-1 justify-center px-5 py-3 bg-slate-900 text-white">
          <div class="flex flex-1 items-center max-w-screen-xl justify-between font-thin text-sm text-center border-1">
            Copyright © 2022, ismail nural. All Rights Reserved
          </div>
        </div>
      </footer>
    </>
  );
});
