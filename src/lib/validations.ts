import { z } from "zod";
import { DEFAULT_PET_IMAGE } from "./constant";

export const petFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name must be at least 1 character long")
      .max(100, "Name must be at most 100 characters long"),
    ownerName: z
      .string()
      .trim()
      .min(1, "Owner name must be at least 1 character long")
      .max(100, "Owner name must be at most 20 characters long"),
    imageUrl: z.union([
      z.literal(""),
      z.string().url().min(1, "Image url must be a valid url"),
    ]),
    age: z.coerce
      .number()
      .int()
      .positive("Age must be a positive number")
      .max(100),
    notes: z.union([z.literal(""), z.string().trim().max(1000)]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
  }));

export const petIdSchema = z.string().cuid();
