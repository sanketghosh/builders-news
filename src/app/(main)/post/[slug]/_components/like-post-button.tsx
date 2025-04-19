"use client";

// packages
import { HeartIcon } from "lucide-react";
import { useState, useTransition } from "react";

// local modules
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { likePostAction } from "@/app/(main)/post/[slug]/_actions/like-post-action";

// components
import { Button } from "@/components/ui/button";

interface ILikePostButtonPropsType {
  postLikes: number;
  postId: string;
  isPostLiked: boolean;
}

export default function LikePostButton({
  postLikes,
  postId,
  isPostLiked,
}: ILikePostButtonPropsType) {
  //   let isPostLiked = false;
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  function handleLikePost(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = await likePostAction(postId);
      if (result.success) {
        toast({
          title: "Success!",
          description: result.success,
        });
        setInterval(() => {}, 1000);
      } else {
        toast({
          variant: "destructive",
          title: "Error!",
          description: result.error,
        });
      }
    });
  }

  return (
    <form onSubmit={handleLikePost}>
      <Button
        size={"sm"}
        variant={"secondary"}
        className={cn(isPostLiked && "text-red-500")}
      >
        <HeartIcon
          className={cn(
            isPostLiked ? "fill-red-500" : "fill-muted-foreground",
            "size-4 stroke-none",
          )}
        />
        {postLikes}
      </Button>
    </form>
  );
}
