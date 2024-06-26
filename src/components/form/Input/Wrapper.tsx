import { ComponentProps } from 'react'

type WrapperProps = ComponentProps<'div'>

export function Wrapper({ ...props }: WrapperProps) {
  return (
    <div {...props} className="flex justify-center items-center rounded ring-2  focus-within:ring-blue-500 outline-none ring-zinc-300" />
  )
}
