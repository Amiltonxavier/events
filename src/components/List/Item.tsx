import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"


type ItemProps = ComponentProps<'li'>

export function Item({...props}: ItemProps) {
  return (
    <li {...props}  className={twMerge("h-full max-w-96 justify-end", props.className)}/>
  )
}
