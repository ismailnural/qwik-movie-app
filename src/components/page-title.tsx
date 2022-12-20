import { component$ } from '@builder.io/qwik'

export default component$(({ title }: { title: string }) => {
  return (
    <div class='flex items-center justify-between'>
      <span class='font-semibold text-xl'>{title}</span>
    </div>
  )
})
