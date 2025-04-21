// packages
import Link from "next/link";
import { MoreVerticalIcon } from "lucide-react";

// local modules
import { getSinglePost } from "@/app/(main)/post/[slug]/_data-fetchers/get-single-post";

// components
import { Button } from "@/components/ui/button";
import PostInteractions from "@/app/(main)/post/[slug]/_components/post-components/post-interactions";
import CommentSectionWrapper from "@/app/(main)/post/[slug]/_components/comment/comment-section-wrapper";

interface ISinglePostPropsType {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: ISinglePostPropsType) {
  const { singlePost } = await getSinglePost(slug);

  return {
    title: singlePost?.title,
    description: singlePost?.body,
  };
}

export default async function SinglePost({ params }: ISinglePostPropsType) {
  const { slug } = await params;

  const { singlePost } = await getSinglePost(slug);

  return (
    <div className="py-4">
      {/* <SinglePostElementWrapper slug={slug} /> */}

      <div className="flex items-center justify-between border-b pb-4">
        <div className="leading-tight">
          <Link
            href={`/profile/${singlePost?.author.id}`}
            className="text-sm font-semibold transition-all hover:text-blue-600 md:text-base"
          >
            {singlePost?.author.email}
          </Link>
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
      <PostInteractions
        slug={slug}
        commentsNumber={singlePost?._count.comments!}
        postLikes={singlePost?._count.postLikes!}
      />
      <CommentSectionWrapper
        commentsNumber={singlePost?._count.comments!}
        slug={slug}
      />
    </div>
  );
}
