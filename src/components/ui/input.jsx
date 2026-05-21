import * as React from "react";

import { cn } from "../../lib/cn.js";

export const Input = React.forwardRef(function Input(
  { className, type = "text", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-border-primary bg-background-primary px-3 py-2 text-sm text-text-primary ring-offset-background-primary file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950/20 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-white/20",
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";
