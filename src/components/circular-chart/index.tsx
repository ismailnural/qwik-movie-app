import { component$, useStylesScoped$ } from '@builder.io/qwik'
import styles from './styles.scss?inline'

export default component$(({ percentage }: { percentage: number }) => {
  useStylesScoped$(styles)

  const color = () => {
    if (percentage > 80) {
      return 'green'
    }
    if (percentage > 60) {
      return 'orange'
    }
    if (percentage > 40) {
      return 'yellow'
    }
    return 'red'
  }

  return (
    <div class='flex-wrapper'>
      <svg viewBox='0 0 36 36' class={`circular-chart ${color()}`}>
        <path
          class='circle-bg'
          d='M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831'
        />
        <path
          class='circle'
          stroke-dasharray={`${percentage}, 100`}
          d='M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831'
        />
        <text x='26' y='17' class='percentage-symbol'>
          %
        </text>
        <text x='16' y='22.5' class='percentage'>
          {percentage}
        </text>
      </svg>
    </div>
  )
})
