import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik';
import styles from './styles.scss?inline';

export default component$(({ posterPath }: { posterPath?: string }) => {
  useStylesScoped$(styles);

  return (
    <div
      class="backdrop-poster"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${posterPath})`,
      }}
    >
      <div class="custom-bg">
        <Slot />
      </div>
    </div>
  );
});
