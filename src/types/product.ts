// app/server/schemas.ts
import { z } from 'zod';

export const productSchema = z.object({
  title: z.string(),
  price: z.number(),
  description: z.string().optional(),
});

export const schemas = {
  product: productSchema,
};

export type SchemaIdentifier = keyof typeof schemas;
