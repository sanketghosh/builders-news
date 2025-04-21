// packages
import Link from "next/link";
import { LockKeyholeIcon } from "lucide-react";

// local modules
import { cn } from "@/lib/utils";
import { getSessionData } from "@/utils/get-session";
import { getExistingPostLike } from "@/app/(main)/post/[slug]/_data-fetchers/get-existing-post-like";

// components
import LikePostButton from "@/app/(main)/post/[slug]/_components/post-components/like-post-button";
import { Button, buttonVariants } from "@/components/ui/button";

interface IPostInteractionsPropsType {
  postLikes: number;
  slug: string;
  commentsNumber: number;
}

export default async function PostInteractions({
  commentsNumber,
  postLikes,
  slug,
}: IPostInteractionsPropsType) {
  const { authenticatedUserId } = await getSessionData();

  if (!authenticatedUserId) {
    return <DoSignUpIfNotAuthenticated />;
  }
  const { isLiked } = await getExistingPostLike({
    postId: slug,
    userId: authenticatedUserId!,
  });

  return (
    <div className="flex items-center space-x-2 py-4 font-medium text-muted-foreground">
      <LikePostButton
        postLikes={postLikes || 0}
        postId={slug}
        isPostLiked={isLiked}
      />
      <Button size={"sm"} variant={"outline"}>
        Comments ({commentsNumber})
      </Button>
    </div>
  );
}

function DoSignUpIfNotAuthenticated() {
  return (
    <div className="mt-6 flex flex-col items-start justify-start space-y-4 rounded-lg border bg-secondary p-4">
      <LockKeyholeIcon size={30} />

      <div className="space-x-2">
        <Link
          href="/sign-up"
          className={cn(
            buttonVariants({
              size: "sm",
              variant: "default",
            }),
          )}
        >
          Sign Up
        </Link>
        <Link
          href="/sign-in"
          className={cn(
            buttonVariants({
              size: "sm",
              variant: "default",
            }),
          )}
        >
          Sign In
        </Link>
      </div>
      <h2 className="text-sm font-medium leading-tight text-muted-foreground">
        *You are not authenticated, to interact with post or check comments do
        sign up or sign in.
      </h2>
    </div>
  );
}
