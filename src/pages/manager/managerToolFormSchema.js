import { z } from "zod";

export const MANAGER_TOOL_STATUSES = [
  "available",
  "in_use",
  "maintenance",
];

export const managerToolFormSchema = z.object({
  name: z.string().min(1, "Tool name is required").max(300),
  description: z
    .string()
    .max(4000, "Description is too long")
    .optional()
    .or(z.literal("")),
  category: z.string().min(1, "Category is required").max(120),
  imageUrl: z
    .string()
    .max(2_000_000, "Image data is too large")
    .optional()
    .or(z.literal("")),
  quantity: z.coerce.number().int().min(0, "Quantity must be 0 or more"),
  status: z.enum(["available", "in_use", "maintenance"]),
  serialNumber: z
    .string()
    .max(120)
    .optional()
    .or(z.literal("")),
});

export function defaultManagerToolValues() {
  return {
    name: "",
    description: "",
    category: "",
    imageUrl: "",
    quantity: 0,
    status: "available",
    serialNumber: "",
  };
}
