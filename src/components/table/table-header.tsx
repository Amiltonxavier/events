import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type TableHeaderProps = ComponentProps<"th">

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <th className={twMerge("py-3 px-4 text-sm font-semibold text-left text-zinc-500", className)} {...props} />
  );
}