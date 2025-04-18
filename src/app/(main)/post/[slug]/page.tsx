// packages
import { HeartIcon, MessageSquareIcon, MoreVerticalIcon } from "lucide-react";

// local modules
import { getSinglePost } from "@/app/(main)/post/[slug]/_data-fetchers/get-single-post";

// components
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import LikePostButton from "./_components/like-post-button";
import { getExistingPostLike } from "./_data-fetchers/get-existing-post-like";
import CommentTree from "./_components/_comment/comment-tree";

interface ISinglePostPropsType {
  params: {
    slug: string;
  };
}

export default async function SinglePost({ params }: ISinglePostPropsType) {
  const { slug } = await params;
  // console.log("@@@ SINGLE POST: ", slug);
  const { singlePost } = await getSinglePost(slug);
  const { isLiked } = await getExistingPostLike(slug);

  return (
    <div className="py-4">
      {/* header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="leading-tight">
          <h2 className="text-sm font-semibold md:text-base">
            {singlePost?.author.email}
          </h2>
          <p className="text-xs font-medium text-muted-foreground">
            Posted on {singlePost?.createdAt.toDateString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size={"icon"} variant={"ghost"}>
            <MoreVerticalIcon />
          </Button>
        </div>
      </div>
      {/* body */}
      <div className="border-b py-4">
        <h1 className="text-base font-bold leading-tight md:text-lg">
          {singlePost?.title}
        </h1>
        <p className="mt-3 text-sm text-foreground/70 md:text-base">
          {singlePost?.body}
        </p>
      </div>
      {/* footer */}
      <div className="flex items-center space-x-4 py-4 font-medium text-muted-foreground">
        <LikePostButton
          postLikes={singlePost?._count.postLikes || 0}
          postId={slug}
          isPostLiked={isLiked}
        />
        <Button size={"sm"} variant={"secondary"}>
          <MessageSquareIcon className="fill-muted-foreground stroke-none" />
          {singlePost?._count.comments}
        </Button>
      </div>
      {/*  comment section */}
      <div className="py-2">
        <CommentTree />
      </div>
    </div>
  );
}
