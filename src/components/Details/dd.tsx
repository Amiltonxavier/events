import { ComponentProps } from "react"


type DDProps = ComponentProps<'dd'>

export function DD({...props}: DDProps) {
  return (
    <dd {...props} className="text-zinc-500 text-left" />
  )
}
