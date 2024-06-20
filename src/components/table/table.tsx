import { ComponentProps } from "react";

interface TableProps extends ComponentProps<"table"> {}

export function Table(props: TableProps) {
  return (
    <div className="table-auto border border-white/10 rounded-lg">
      <table className="w-full" {...props} />
    </div>
  );
}