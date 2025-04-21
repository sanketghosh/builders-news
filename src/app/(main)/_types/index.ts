import { PostLike, User } from "@prisma/client";

/* export type FetchedPostType = {
  id: string;
  title: string;
  body: string;
  postLikes: PostLike[];
  author: User;
  createdAt: Date;
}; */

export type FetchedPostType = {
  likesCount: number;
  id: string;
  createdAt: Date;
  title: string;
  body: string;
  author: {
    name: string;
    id: string;
    email: string;
  };
  _count: {
    postLikes: number;
  };
};

export type SortOrderType = "latest" | "oldest";
