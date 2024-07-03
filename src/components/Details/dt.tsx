import { ComponentProps } from 'react'


type DTProps = ComponentProps<'dt'>

export function DT({...props}: DTProps) {
  return <dt {...props} className='text-zinc-600 font-medium text-base' />
}
