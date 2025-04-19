"use client";

// packages
import React, { useState } from "react";

// local modules
import { cn } from "@/lib/utils";
import {
  CommentWithDetails,
  CurrentUser,
} from "@/app/(main)/post/[slug]/_types";

// components
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CommentProps {
  comment: CommentWithDetails;
  addReply: (parentId: string, content: string) => void;
  deleteComment: (id: string) => void;
  toggleLike: (id: string) => void;
  currentUser: CurrentUser;
}

export default function CommentElement({
  comment,
  addReply,
  deleteComment,
  toggleLike,
  currentUser,
}: CommentProps) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (replyText.trim()) {
      addReply(comment.id, replyText);
      setReplyText("");
      setShowReplyBox(false);
    }
  };

  /* const isLiked = comment.likedBy.includes(currentUserEmail);
  const isOwner = comment.userEmail === currentUserEmail; */

  const isLiked = comment.isLikedByCurrentUser ?? false;
  const isOwner = currentUser?.id === comment.authorId;
  const likeCount = comment._count?.commentLikes ?? 0;

  return (
    <div className="relative mt-2">
      <div className="rounded-md border p-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-blue-600 underline underline-offset-2">
            {comment.author.email}
          </span>
          {isOwner && (
            <button
              className="text-xs font-medium text-destructive"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </button>
          )}
        </div>

        <p className="mt-2">{comment.text}</p>

        <div className="mt-2 flex items-center gap-4 text-xs text-foreground/50">
          <button
            className={cn(
              "font-medium hover:text-blue-700",
              isLiked && "text-blue-600",
            )}
            onClick={() => toggleLike(comment.id)}
          >
            {isLiked ? "Unlike" : "Like"} ({likeCount})
          </button>
          <button
            className={cn(
              "font-medium",
              showReplyBox
                ? "text-destructive"
                : "text-blue-600 hover:text-blue-700",
            )}
            onClick={() => setShowReplyBox(!showReplyBox)}
          >
            {showReplyBox ? "Cancel" : "Reply"}
          </button>
        </div>

        {showReplyBox && (
          <div className="mt-2">
            <Textarea
              className="w-full"
              rows={2}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
            />
            <Button
              size={"sm"}
              variant={"secondary"}
              onClick={handleReply}
              className="mt-2"
            >
              Reply
            </Button>
          </div>
        )}
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-2 mt-2 border-l border-foreground/20 pl-2">
          {comment.replies.map((reply) => (
            <CommentElement
              key={reply.id}
              comment={reply}
              addReply={addReply}
              deleteComment={deleteComment}
              toggleLike={toggleLike}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </div>
  );
}
