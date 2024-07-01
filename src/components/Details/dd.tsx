import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"


type DDProps = ComponentProps<'dd'>

export function DD({...props}: DDProps) {
  return (
    <dd {...props} className={twMerge("text-zinc-500 text-left", props.className)} />
  )
}
