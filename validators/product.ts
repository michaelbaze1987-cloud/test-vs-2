import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3).max(120),
  slug: z.string().min(3).max(140),
  description: z.string().min(20).max(5000),
  imageUrl: z.union([z.url("Image URL invalide"), z.literal(""), z.null()]).optional(),
  categoryName: z.string().min(2).max(80),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().min(0),
  supplier: z.string().min(2).max(80).default("manual"),
  supplierExternalId: z.string().min(2).max(120).default("manual-entry"),
  costPrice: z.coerce.number().nonnegative().default(0),
});

export type ProductInput = z.infer<typeof productSchema>;
