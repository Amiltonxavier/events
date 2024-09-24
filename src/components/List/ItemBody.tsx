import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
type ItemBodyProps = ComponentProps<'span'>


export function ItemBody({ ...props }: ItemBodyProps) {
  return (
    <span {...props} className={twMerge('transition-all duration-150 ease-in-out block text-xs sm:text-base font-medium sm:font-semibold leading-relaxed sm:leading-[26px] text-[#787880] flex-1 truncate', props.className)} />
  )
}
