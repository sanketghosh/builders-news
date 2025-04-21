import { PostWithDetails } from "@/app/(main)/profile/[slug]/_types";
import { prisma } from "@/lib/prisma";

/**
 *
 * @param userId
 * @returns
 */
export const getUserPosts = async (
  userId: string,
): Promise<PostWithDetails[] | null> => {
  if (!userId) {
    throw new Error("User ID is required.");
  }

  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },

      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        // include counts of related comments and posts
        _count: {
          select: {
            comments: true,
            postLikes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  } catch (error) {
    console.error(`ERROR! failed to fetch posts for user ${userId}:`, error);
    return null;
  }
};
