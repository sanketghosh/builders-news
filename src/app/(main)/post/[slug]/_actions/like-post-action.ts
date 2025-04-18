"use server";

// packages
import { revalidatePath } from "next/cache";

// local modules
import { getSessionData } from "@/utils/get-session";
import { prisma } from "@/lib/prisma";
import { ServerActionReturnType } from "@/types";

export async function likePostAction(postId: string) {
  const { authenticatedUserId } = await getSessionData();

  // if user is not authenticated
  if (!authenticatedUserId) {
    return {
      error: "Unauthorized user cannot like post.",
    };
  }

  const existingLike = await prisma.postLike.findUnique({
    where: {
      userId_postId: {
        userId: authenticatedUserId,
        postId: postId,
      },
    },
  });

  try {
    if (existingLike) {
      await prisma.postLike.delete({
        where: {
          userId_postId: {
            userId: authenticatedUserId,
            postId: postId,
          },
        },
      });
      revalidatePath(`/post/${postId}`);
      return {
        success: "You have un-liked the post.",
      };
    } else {
      await prisma.postLike.create({
        data: {
          userId: authenticatedUserId,
          postId: postId,
        },
      });
      revalidatePath(`/post/${postId}`);
      return {
        success: "You have liked the post.",
      };
    }
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}
