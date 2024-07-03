import { ComponentProps } from 'react'

type DLProps = ComponentProps<'dl'>

export function DL({...props}: DLProps) {
  return (
    <dl {...props} className='divide-y divide-gray-100' />
  )
}
