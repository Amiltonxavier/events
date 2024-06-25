import { ComponentProps } from "react"

type ButtonProps = ComponentProps<'button'> &{

}

export function Button({ type='submit', ...props}: ButtonProps) {

  return (
    <button type={type} {...props} className="font-bold text-base p-4 w-full shadow bg-blue-500 text-gray-100 rounded hover:bg-blue-600 duration-150 transition-colors focus-within:ring-4 focus-within:ring-blue-600 outline-none" />
  )
}
