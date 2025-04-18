"use client";

// packages
import React, { useState } from "react";
import { v4 as uuid } from "uuid";

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

export default function CommentTree() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");

  const currentUserEmail = "jane@example.com"; // Simulated logged-in user

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
          onClick={addComment}
        >
          Add Comment
        </Button>
      </div>

      <div>
        {comments.map((comment) => (
          <CommentElement
            key={comment.id}
            comment={comment}
            addReply={addReply}
            deleteComment={deleteComment}
            toggleLike={toggleLike}
            currentUserEmail={currentUserEmail}
          />
        ))}
      </div>
    </div>
  );
}
