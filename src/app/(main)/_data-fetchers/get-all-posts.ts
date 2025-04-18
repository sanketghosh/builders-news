import { prisma } from "@/lib/prisma";
import { SortOrderType } from "@/types";

export const getAllPosts = async (sort: SortOrderType) => {
  const data = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      body: true,
      postLikes: true,
      author: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: sort === "latest" ? "desc" : "asc",
    },
  });
  return {
    data,
  };
};
