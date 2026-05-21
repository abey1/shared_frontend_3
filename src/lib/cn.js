/**
 * Join class names (shadcn-style helper; no clsx dependency).
 * @param  {...unknown} inputs
 */
export function cn(...inputs) {
  return inputs
    .flat(Infinity)
    .filter((x) => typeof x === "string" && x.trim().length > 0)
    .join(" ");
}
