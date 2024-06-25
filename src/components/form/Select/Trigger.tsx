import { ComponentProps } from 'react'

type SelectProps = ComponentProps<'select'>

export  function Trigger({ ...props}: SelectProps) {
  return <select {...props} required className="py-3 px-4 bg-transparent rounded ring-2 ring-zinc-400 focus-within:ring-blue-500 outline-none" />
}
