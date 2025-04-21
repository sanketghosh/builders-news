import { Post, User } from "@prisma/client";

export type PostWithDetails = Post & {
  author: Pick<User, "id" | "name" | "email" | "image">;
  _count: {
    comments: number;
    postLikes: number;
  };
};
