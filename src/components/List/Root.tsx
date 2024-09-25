import type { ComponentProps } from 'react'

type RootProps = ComponentProps<'div'>

export function Root({ ...props }: RootProps) {
  return (
    <div {...props} className='max-w-full w-full p-4 sm:p-8 bg-white rounded-lg gap-4 hover:border-b-4 hover:border-blue-500 duration-150 hover:scale-105 cursor-pointer overflow-hidden' />
  )
}
