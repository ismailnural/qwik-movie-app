import { component$, useStylesScoped$ } from '@builder.io/qwik'
import GhostLoader from './ghost-loader'
import styles from './styles.scss?inline'

export default component$(
  ({
    posterPath,
    size,
  }: {
    posterPath?: string
    size: 'small' | 'medium' | 'large'
  }) => {
    useStylesScoped$(styles)

    const posterSize = {
      small: 300,
      medium: 780,
      large: 1280,
    }

    return (
      <div class='poster'>
        <img
          src={`https://www.themoviedb.org/t/p/w${posterSize[size]}${posterPath}`}
          width={posterSize[size] / 2}
          height='auto'
        />
        <GhostLoader />
      </div>
    )
  }
)
