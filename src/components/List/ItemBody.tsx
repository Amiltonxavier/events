import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
type ItemBodyProps = ComponentProps<'span'>


export function ItemBody({...props}:ItemBodyProps) {
  return (
    <span {...props} className={twMerge('block text-sm sm:text-base font-semibold sm:leading-[26px] text-[#787880] flex-1 truncate', props.className)}/>
  )
}
