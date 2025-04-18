import { z } from "zod";

export const MakePostSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title cannot be empty" })
    .max(300, { message: "Maximum 300 characters allowed." }),
  body: z.string().optional(),
});

export type MakePostSchemaType = z.infer<typeof MakePostSchema>;
