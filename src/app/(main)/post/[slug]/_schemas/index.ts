import { z } from "zod";

export const AddCommentSchema = z.object({
  postId: z.string(),
  text: z.string().min(1, {
    message: "Adding comment is must.",
  }),
});

export type AddCommentSchemaType = z.infer<typeof AddCommentSchema>;

export const AddReplySchema = z.object({
  postId: z.string(),
  parentId: z.string(),
  text: z.string().min(1, {
    message: "Adding comment body is must.",
  }),
});

export type AddReplySchemaType = z.infer<typeof AddReplySchema>;

export const DeleteCommentSchema = z.object({
  commentId: z.string(),
  postId: z.string(),
});

export type DeleteCommentSchemaType = z.infer<typeof DeleteCommentSchema>;

export const ToggleCommentLikeSchema = z.object({
  commentId: z.string(),
  postId: z.string(),
});

export type ToggleCommentLikeSchemaType = z.infer<typeof DeleteCommentSchema>;
