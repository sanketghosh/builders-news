"use client";

// Comment Type Definition
export type Comment = {
  id: string;
  text: string;
  author: string;
  likes: number;
  isLiked: boolean;
  replies: Comment[];
};

// Sample Comment Data
export const commentsData: Comment[] = [
  {
    id: "1",
    text: "This is a great post!",
    author: "Alice",
    likes: 3,
    isLiked: false,
    replies: [
      {
        id: "1-1",
        text: "I agree! This is really insightful.",
        author: "Bob",
        likes: 2,
        isLiked: false,
        replies: [
          {
            id: "1-1-1",
            text: "Absolutely! Loved this discussion.",
            author: "Charlie",
            likes: 1,
            isLiked: false,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    text: "Could you elaborate more on this topic?",
    author: "David",
    likes: 5,
    isLiked: false,
    replies: [
      {
        id: "2-1",
        text: "Sure! What part do you need more details on?",
        author: "Alice",
        likes: 1,
        isLiked: false,
        replies: [
          {
            id: "2-1-1",
            text: "The second section, mainly.",
            author: "David",
            likes: 0,
            isLiked: false,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: "3",
    text: "This is an amazing perspective!",
    author: "Eve",
    likes: 4,
    isLiked: false,
    replies: [],
  },
];

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HeartIcon,
  ReplyIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";

// Sample logged-in user
const loggedInUser = "JohnDoe";

const CommentComponent = ({
  comment,
  onReply,
  onLike,
  onDelete,
}: {
  comment: Comment;
  onReply: (id: string, text: string) => void;
  onLike: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const [replyText, setReplyText] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold">{comment.author}</p>
          <p className="text-gray-700">{comment.text}</p>
        </div>
        {comment.author === loggedInUser && (
          <button
            onClick={() => onDelete(comment.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2Icon />
          </button>
        )}
      </div>
      <div className="mt-2 flex gap-4">
        <button
          onClick={() => onLike(comment.id)}
          className="flex items-center gap-1 text-gray-500 hover:text-red-500"
        >
          <HeartIcon
            className={cn(
              "size-5 stroke-none",
              comment.isLiked ? "fill-red-500" : "fill-muted-foreground",
            )}
          />

          <p className="font-semibold">{comment.likes}</p>
        </button>
        <button
          onClick={() => {
            setShowReplyBox(!showReplyBox);
            setReplyText(`@${comment.author} `);
          }}
          className="flex items-center gap-1 text-gray-500 hover:text-blue-500"
        >
          <ReplyIcon className="size-5" />
          Reply
        </button>
      </div>

      {showReplyBox && (
        <div className="mt-2 flex gap-2">
          {/* <Textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full"
            placeholder="Write a reply..."
          />
          <button
            onClick={() => {
              if (replyText.trim()) {
                onReply(comment.id, replyText);
                setReplyText("");
                setShowReplyBox(false);
              }
            }}
            className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
          >
            Reply
          </button> */}
          <div className="flex w-full rounded-md border p-2">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="h-24 max-h-24 w-full border-none outline-none"
              placeholder="Write a reply..."
            ></textarea>
            <Button
              size={"icon"}
              onClick={() => {
                if (replyText.trim()) {
                  onReply(comment.id, replyText);
                  setReplyText("");
                  setShowReplyBox(false);
                }
              }}
            >
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      )}

      {comment.replies.length > 0 && (
        <div className="ml-6 mt-2 border-l pl-4">
          {comment.replies.map((reply) => (
            <CommentComponent
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onLike={onLike}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const NestedComments = () => {
  const [comments, setComments] = useState<Comment[]>(commentsData);

  const handleReply = (id: string, text: string) => {
    const newComment = {
      id: Math.random().toString(),
      text,
      author: loggedInUser,
      likes: 0,
      isLiked: false,
      replies: [],
    };

    const addReply = (commentsList: Comment[]): Comment[] =>
      commentsList.map((c) =>
        c.id === id
          ? { ...c, replies: [...c.replies, newComment] }
          : { ...c, replies: addReply(c.replies) },
      );

    setComments((prev) => addReply(prev));
  };

  const handleLike = (id: string) => {
    const toggleLike = (commentsList: Comment[]): Comment[] =>
      commentsList.map((c) =>
        c.id === id
          ? {
              ...c,
              likes: c.isLiked ? c.likes - 1 : c.likes + 1,
              isLiked: !c.isLiked,
            }
          : { ...c, replies: toggleLike(c.replies) },
      );

    setComments((prev) => toggleLike(prev));
  };

  const handleDelete = (id: string) => {
    const deleteComment = (commentsList: Comment[]): Comment[] =>
      commentsList
        .filter((c) => c.id !== id)
        .map((c) => ({ ...c, replies: deleteComment(c.replies) }));

    setComments((prev) => deleteComment(prev));
  };

  return (
    <div className="mt-10 w-full space-y-4">
      {comments.map((comment) => (
        <CommentComponent
          key={comment.id}
          comment={comment}
          onReply={handleReply}
          onLike={handleLike}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default NestedComments;
