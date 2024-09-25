import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

type ButtonProps = ComponentProps<'button'> & {

}

export function Button({ type = 'submit', className, ...props }: ButtonProps) {

  return (
    <button
      type={type}
      className={twMerge("font-bold text-base hover:shadow-md p-4 w-full shadow bg-blue-500 text-gray-100 rounded hover:bg-blue-600 duration-150 transition-colors focus-within:ring-4 focus-within:ring-blue-600 outline-none", className)}
      {...props}
    />
  )
}
