import * as React from "react";

import { cn } from "../../lib/cn.js";

const variants = {
  default:
    "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white",
  ghost:
    "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
  outline:
    "border border-border-primary bg-background-primary hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900",
  secondary:
    "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700",
};

const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  icon: "h-10 w-10",
};

/** shadcn-style button (tailwind-only implementation). */
export const Button = React.forwardRef(function Button(
  { className, variant = "default", size = "default", type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950/25 dark:focus-visible:ring-white/25 disabled:pointer-events-none disabled:opacity-50",
        variants[variant] ?? variants.default,
        sizes[size] ?? sizes.default,
        className,
      )}
      {...props}
    />
  );
});

Button.displayName = "Button";
