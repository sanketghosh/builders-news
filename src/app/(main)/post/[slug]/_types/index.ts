import { Comment, CommentLike, User } from "@prisma/client";

export type CommentWithDetails = Comment & {
  author: Pick<User, "id" | "name" | "email" | "image">;
  replies: CommentWithDetails[];
  commentLikes: Pick<CommentLike, "userId">[];
  _count: {
    commentLikes: number;
  };
  isLikedByCurrentUser?: boolean;
};

export type CurrentUser = Pick<User, "id" | "name" | "email" | "image"> | null;
