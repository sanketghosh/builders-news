// local modules
import { prisma } from "@/lib/prisma";
import { CommentWithDetails } from "@/app/(main)/post/[slug]/_types";

type GetCommentsForPostsParametersType = {
  postId: string;
  currentUserId: string;
};

export const getCommentsForPosts = async ({
  currentUserId,
  postId,
}: GetCommentsForPostsParametersType) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
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
      commentLikes: {
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          commentLikes: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const commentsMap = new Map<string, CommentWithDetails>();
  const rootComments: CommentWithDetails[] = [];

  // process comments and add isLikedByCurrentUser flag
  const processedComments = comments.map((comment) => ({
    ...comment,
    isLikedByCurrentUser: currentUserId
      ? comment.commentLikes.some((like) => like.userId === currentUserId)
      : false,
    replies: [],
  }));

  // build the map and identify root comments
  processedComments.forEach((comment) => {
    commentsMap.set(comment.id, comment);
    if (comment.parentId === null) {
      rootComments.push(comment);
    }
  });

  // build the tree structure
  processedComments.forEach((comment) => {
    if (comment.parentId !== null) {
      const parent = commentsMap.get(comment.parentId);
      if (parent) {
        parent.replies = parent.replies || [];
        parent.replies.push(comment);
      }
    }
  });

  return rootComments;
};
