"use server";

// packages
import { revalidatePath } from "next/cache";

// local modules
import { getSessionData } from "@/utils/get-session";
import {
  AddCommentSchema,
  AddCommentSchemaType,
  AddReplySchema,
  AddReplySchemaType,
  DeleteCommentSchema,
  DeleteCommentSchemaType,
  ToggleCommentLikeSchema,
  ToggleCommentLikeSchemaType,
} from "@/app/(main)/post/[slug]/_schemas";
import { prisma } from "@/lib/prisma";

// --- ADD COMMENT ACTION ---
export async function addCommentAction(data: AddCommentSchemaType) {
  const validateFields = AddCommentSchema.safeParse(data);

  if (!validateFields.success) {
    return {
      error: "Fields are invalid, failed to parse.",
    };
  }
  const { postId, text } = validateFields.data;
  const { authenticatedUserId } = await getSessionData();

  if (!authenticatedUserId) {
    return {
      error: "User is not authenticated, you cannot add comment.",
    };
  }

  try {
    await prisma.comment.create({
      data: {
        text: text,
        postId: postId,
        authorId: authenticatedUserId!,
      },
    });
    revalidatePath(`/post/${postId}`);
    return {
      success: "Comment has been added.",
    };
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}

// --- ADD REPLY ACTION ---
export async function addReplyAction(data: AddReplySchemaType) {
  const validateFields = AddReplySchema.safeParse(data);

  if (!validateFields.success) {
    return {
      error: "Fields are invalid, failed to parse.",
    };
  }
  const { postId, text, parentId } = validateFields.data;
  const { authenticatedUserId } = await getSessionData();

  if (!authenticatedUserId) {
    return {
      error: "User is not authenticated, you cannot add comment.",
    };
  }

  try {
    await prisma.comment.create({
      data: {
        text: text,
        postId: postId,
        authorId: authenticatedUserId!,
        parentId: parentId,
      },
    });

    revalidatePath(`/post/${postId}`);
    return {
      success: "Reply has been added.",
    };
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}

// --- DELETE COMMENT ACTION ---
export async function deleteCommentAction(data: DeleteCommentSchemaType) {
  const validateFields = DeleteCommentSchema.safeParse(data);

  if (!validateFields.success) {
    return {
      error: "Fields are invalid, failed to parse.",
    };
  }
  const { postId, commentId } = validateFields.data;
  const { authenticatedUserId } = await getSessionData();

  if (!authenticatedUserId) {
    return {
      error: "User is not authenticated, you cannot add comment.",
    };
  }

  try {
    const commentToDelete = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      select: {
        authorId: true,
      },
    });

    // if comment not found
    if (!commentToDelete) {
      return {
        error: "Comment has not been found.",
      };
    }

    // if not author's comment
    if (commentToDelete.authorId !== authenticatedUserId) {
      return {
        error: "Not authorized to delete this comment.",
      };
    }

    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    revalidatePath(`/post/${postId}`);
    return {
      success: "Comment has been deleted successfully.",
    };
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}

// --- TOGGLE COMMENT LIKE ACTION
export async function toggleCommentLikeAction(
  data: ToggleCommentLikeSchemaType,
) {
  const validateFields = ToggleCommentLikeSchema.safeParse(data);

  if (!validateFields.success) {
    return {
      error: "Fields are invalid, failed to parse.",
    };
  }
  const { postId, commentId } = validateFields.data;
  const { authenticatedUserId } = await getSessionData();

  if (!authenticatedUserId) {
    return {
      error: "User is not authenticated, you cannot add comment.",
    };
  }

  try {
    // Check if the like already exists
    const existingLike = await prisma.commentLike.findUnique({
      where: {
        userId_commentId: {
          userId: authenticatedUserId,
          commentId: commentId,
        },
      },
    });

    if (existingLike) {
      // Unlike
      await prisma.commentLike.delete({
        where: {
          userId_commentId: {
            userId: authenticatedUserId,
            commentId: commentId,
          },
        },
      });
      revalidatePath(`/post/${postId}`);
      return { success: "Comment has been un-liked" };
    } else {
      // Like
      await prisma.commentLike.create({
        data: {
          userId: authenticatedUserId,
          commentId: commentId,
        },
      });
      revalidatePath(`/post/${postId}`);
      return { success: "Comment has been liked" };
    }
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}
