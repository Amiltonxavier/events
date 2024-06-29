
import { InputHTMLAttributes, forwardRef } from 'react'

type SelectProps = InputHTMLAttributes<HTMLSelectElement>;
export const Trigger = forwardRef<HTMLSelectElement, SelectProps>(
  ({ name, ...rest }, ref) => {
    return (
      <select
        {...rest}
        name={name}
        ref={ref}
        className="py-3 px-4 bg-transparent rounded ring-2 ring-zinc-400 focus-within:ring-blue-500 outline-none"
      />
    );
  }
);
