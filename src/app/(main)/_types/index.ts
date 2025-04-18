import { PostLike, User } from "@prisma/client";

export type FetchedPostType = {
  id: string;
  title: string;
  body: string;
  postLikes: PostLike[];
  author: User;
  createdAt: Date;
};

export type SortOrderType = "latest" | "oldest";
