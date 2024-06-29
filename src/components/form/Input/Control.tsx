import { InputHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'



type InputProps = InputHTMLAttributes<HTMLInputElement>;
export const Control = forwardRef<HTMLInputElement, InputProps>(
  ({ name, type = 'text', className, ...rest }, ref) => {
    return (
      <input
        {...rest}
        name={name}
        type={type}
        className={twMerge(
          'w-full p-3 bg-transparent rounded text-sm placeholder:text-zinc-400 outline-none ring-0',
          className
        )}
        ref={ref}
      />
    );
  }
);