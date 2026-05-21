import * as React from "react";

import { cn } from "../../lib/cn.js";

export function Table({ className, ...props }) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

export function TableHeader({ className, ...props }) {
  return <thead className={cn("[&_tr]:border-b", className)} {...props} />;
}

export function TableBody({ className, ...props }) {
  return (
    <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  );
}

export function TableRow({ className, ...props }) {
  return (
    <tr
      className={cn(
        "border-b border-border-primary transition-colors hover:bg-neutral-50/80 data-[state=selected]:bg-neutral-50 dark:hover:bg-neutral-900/50",
        className,
      )}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }) {
  return (
    <th
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-text-secondary [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }) {
  return (
    <td
      className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
      {...props}
    />
  );
}
