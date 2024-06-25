import { ComponentProps } from "react"

type RootProps = ComponentProps<'div'>

export function Root({...props}: RootProps) {
  return (
    <div {...props} className='flex flex-col gap-4 mt-6 border-t border-gray-100 divide-y divide-gray-200' />
  )
}
