import { prisma } from "@/lib/prisma";
import { getSessionData } from "@/utils/get-session";

export const getExistingPostLike = async (postId: string) => {
  const { authenticatedUserId } = await getSessionData();

  const existingLike = await prisma.postLike.findUnique({
    where: {
      userId_postId: {
        userId: authenticatedUserId,
        postId: postId,
      },
    },
  });

  return { isLiked: Boolean(existingLike) };
};
