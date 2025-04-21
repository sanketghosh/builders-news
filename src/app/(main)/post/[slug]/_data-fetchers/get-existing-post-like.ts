import { prisma } from "@/lib/prisma";
import { getSessionData } from "@/utils/get-session";

type GetExistingPostLikeType = {
  postId: string;
  userId: string;
};

export const getExistingPostLike = async ({
  postId,
  userId,
}: GetExistingPostLikeType) => {
  const { authenticatedUserId } = await getSessionData();

  const existingLike = await prisma.postLike.findUnique({
    where: {
      userId_postId: {
        userId: userId,
        postId: postId,
      },
    },
  });

  return { isLiked: Boolean(existingLike) };
};
