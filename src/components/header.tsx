import { component$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'

export default component$(() => {
  return (
    <header>
      <div class='flex flex-1 justify-center px-5 py-3 bg-slate-900 text-white'>
        <div class='flex flex-1 items-center max-w-screen-xl justify-between'>
          <div class='font-bold text-2xl'>
            <Link class='logo' href='/'>
              qMovie
              <span class='text-red-600'>.</span>
            </Link>
          </div>
          <div class='font-thin text-sm'>
            Contact:{' '}
            <a
              href='mailto:ismail.nural@adesso.com.tr'
              target='_blank'
              class='hover:text-gray-300'
            >
              ismail.nural@adesso.com.tr
            </a>
          </div>
        </div>
      </div>
    </header>
  )
})
