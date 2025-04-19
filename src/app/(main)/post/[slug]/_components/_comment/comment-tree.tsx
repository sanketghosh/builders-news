"use client";

// packages
import React, { useState, useTransition } from "react";

// local modules
import { useToast } from "@/hooks/use-toast";
import {
  CommentWithDetails,
  CurrentUser,
} from "@/app/(main)/post/[slug]/_types";
import {
  addCommentAction,
  addReplyAction,
  deleteCommentAction,
  toggleCommentLikeAction,
} from "@/app/(main)/post/[slug]/_actions/comment-actions";

// components
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CommentElement from "@/app/(main)/post/[slug]/_components/_comment/comment-element";

export interface CommentType {
  id: string;
  parentId: string | null;
  content: string;
  userEmail: string;
  likedBy: string[];
  replies?: CommentType[];
}

interface ICommentTreeProps {
  initialComments: CommentWithDetails[];
  postId: string;
  currentUser: CurrentUser;
}

export default function CommentTree({
  currentUser,
  initialComments,
  postId,
}: ICommentTreeProps) {
  // const [comments, setComments] = useState<CommentType[]>([]);
  // const currentUserEmail = "jane@example.com"; // Simulated logged-in user
  /*
  const findCommentById = (
    comments: CommentType[],
    id: string,
  ): CommentType | undefined => {
    for (let comment of comments) {
      if (comment.id === id) return comment;
      if (comment.replies) {
        const found = findCommentById(comment.replies, id);
        if (found) return found;
      }
    }
  };

  const addComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: uuid(),
          parentId: null,
          content: newComment,
          userEmail: currentUserEmail,
          likedBy: [],
          replies: [],
        },
      ]);
      setNewComment("");
    }
  };

  const addReply = (parentId: string, content: string) => {
    const parent = findCommentById(comments, parentId);
    const reply: CommentType = {
      id: uuid(),
      parentId,
      content: `@${parent?.userEmail} ${content}`,
      userEmail: currentUserEmail,
      likedBy: [],
      replies: [],
    };

    const addReplyRecursive = (comments: CommentType[]): CommentType[] =>
      comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply],
          };
        } else if (comment.replies) {
          return {
            ...comment,
            replies: addReplyRecursive(comment.replies),
          };
        }
        return comment;
      });

    setComments(addReplyRecursive(comments));
  };

  const deleteComment = (id: string) => {
    const removeRecursive = (comments: CommentType[]): CommentType[] =>
      comments
        .filter((c) => c.id !== id)
        .map((c) => ({
          ...c,
          replies: c.replies ? removeRecursive(c.replies) : [],
        }));

    setComments(removeRecursive(comments));
  };

   const toggleLike = (id: string) => {
    const toggleRecursive = (comments: CommentType[]): CommentType[] =>
      comments.map((c) => {
        if (c.id === id) {
          const isLiked = c.likedBy.includes(currentUserEmail);
          return {
            ...c,
            likedBy: isLiked
              ? c.likedBy.filter((email) => email !== currentUserEmail)
              : [...c.likedBy, currentUserEmail],
          };
        } else if (c.replies) {
          return {
            ...c,
            replies: toggleRecursive(c.replies),
          };
        }
        return c;
      });

    setComments(toggleRecursive(comments));
  }; */

  const [newComment, setNewComment] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  // add comment handler
  // adds the parent/ main comment
  const handleAddComment = () => {
    // if user does not exist throw error
    if (!currentUser) {
      toast({
        title: "ERROR!",
        description: "You must be logged in to make a comment.",
        variant: "destructive",
      });
    }

    if (newComment.trim()) {
      startTransition(async () => {
        const result = await addCommentAction({
          text: newComment,
          postId: postId,
        });

        if (result.success) {
          setNewComment("");
          toast({
            title: "SUCCESS!",
            description: result.success,
          });
        } else {
          toast({
            title: "ERROR!",
            description: result.error || "Failed to add comment.",
            variant: "destructive",
          });
        }
      });
    }
  };

  // add replies
  // child comment to the parent comments
  const handleAddReply = (parentId: string, content: string) => {
    // if user does not exist throw error
    if (!currentUser) {
      toast({
        title: "ERROR!",
        description: "You must be logged in to reply.",
        variant: "destructive",
      });
    }
    startTransition(async () => {
      const result = await addReplyAction({
        parentId: parentId,
        postId: postId,
        text: content,
      });
      if (result.success) {
        toast({
          title: "SUCCESS!",
          description: result.success,
        });
      } else {
        toast({
          title: "ERROR!",
          description: result.error || "Failed to add reply.",
          variant: "destructive",
        });
      }
    });
  };

  // delete comment
  // handle comment deletion
  const handleDeleteComment = (commentId: string) => {
    // if user does not exist throw error
    if (!currentUser) {
      toast({
        title: "ERROR!",
        description: "You must be logged in to delete comment.",
        variant: "destructive",
      });
    }
    startTransition(async () => {
      const result = await deleteCommentAction({
        commentId: commentId,
        postId: postId,
      });
      if (result.success) {
        toast({
          title: "SUCCESS!",
          description: result.success,
        });
      } else {
        toast({
          title: "ERROR!",
          description: result.error || "Failed to delete comment.",
          variant: "destructive",
        });
      }
    });
  };

  // handle toggle like
  // helps in liking or un-liking a comment/ reply
  const handleToggleCommentLike = (commentId: string) => {
    // if user does not exist throw error
    if (!currentUser) {
      toast({
        title: "ERROR!",
        description: "You must be logged in to delete comment.",
        variant: "destructive",
      });
    }

    startTransition(async () => {
      const result = await toggleCommentLikeAction({
        commentId: commentId,
        postId: postId,
      });
      if (result.success) {
        toast({
          title: "SUCCESS!",
          description: result.success,
        });
      } else {
        toast({
          title: "ERROR!",
          description: result.error || "Failed to like comment.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <Textarea
          className="w-full"
          rows={3}
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          variant={"default"}
          size={"sm"}
          className="mt-2"
          onClick={handleAddComment}
        >
          Add Comment
        </Button>
      </div>

      <div>
        {initialComments.map((comment) => (
          <CommentElement
            key={comment.id}
            comment={comment}
            addReply={handleAddReply}
            deleteComment={handleDeleteComment}
            toggleLike={handleToggleCommentLike}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
}
