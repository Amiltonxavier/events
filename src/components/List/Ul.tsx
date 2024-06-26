import { ComponentProps } from 'react'

type UlProps = ComponentProps<'ul'>

export function Ul({...props}:UlProps) {
  return <ul {...props} className='grid grid-cols-6 gap-2 sm:gap-4 auto-rows-auto'/>
}
