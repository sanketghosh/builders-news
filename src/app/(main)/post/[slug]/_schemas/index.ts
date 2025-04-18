import { z } from "zod";

export const CommentSchema = z.object({
  text: z.string().min(1),
  postId: z.string(),
  parentId: z.string().optional(),
  authorId: z.string(),
});

export type CommentSchemaType = z.infer<typeof CommentSchema>;
