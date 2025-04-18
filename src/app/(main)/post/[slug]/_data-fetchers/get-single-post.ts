import { prisma } from "@/lib/prisma";

export const getSinglePost = async (slug: string) => {
  const singlePost = await prisma.post.findUnique({
    where: {
      id: slug,
    },
    select: {
      title: true,
      body: true,
      createdAt: true,
      author: true,
      authorId: true,
      id: true,
      updatedAt: true,
      /* comments: true,
      postLikes: true, */
      _count: {
        select: {
          postLikes: true,
          comments: true,
        },
      },
    },
  });

  return {
    singlePost,
  };
};
