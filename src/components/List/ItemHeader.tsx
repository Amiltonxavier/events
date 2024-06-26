import { ComponentProps } from 'react'

type ItemHeaderProps = ComponentProps<'span'>

export function ItemHeader({...props}: ItemHeaderProps) {
  return (
    <span {...props} className='font-semibold block text-xs text-left uppercase leading-6 text-[#BFBFCC] flex-shrink-0'/>
  )
}
