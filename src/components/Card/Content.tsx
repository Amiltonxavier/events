import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
type ContentProps = ComponentProps<'span'> & {
    amount: string | number,
    signal?: string
    title: string
}

export function Content({ amount, signal, title, ...props }: ContentProps) {
  return (
    <>
        <span  className={twMerge("mb-1 text-base font-semibold text-zinc-700", props.className)}>{title}</span>
            <span className="overflow-auto">
              <h4 className="text-xl lg:text-3xl mt-2 sm:mt-4 text-zinc-600 font-bold truncate">
                <span>{signal}</span>{amount}
              </h4>  
          </span>
    </>
  )
}
