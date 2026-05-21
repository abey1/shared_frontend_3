import * as React from "react";

import { cn } from "../../lib/cn.js";

export function Label({ className, htmlFor, ...props }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-sm font-medium leading-none text-text-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  );
}
