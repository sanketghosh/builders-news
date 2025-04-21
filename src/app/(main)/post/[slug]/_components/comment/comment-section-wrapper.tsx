// local modules
import { getCommentsForPosts } from "@/app/(main)/post/[slug]/_data-fetchers/get-comments-for-post";
import { CurrentUser } from "@/app/(main)/post/[slug]/_types";
import { getSessionData } from "@/utils/get-session";

// components
import CommentTree from "@/app/(main)/post/[slug]/_components/comment/comment-tree";

interface ICommentSectionWrapperPropsType {
  slug: string;
  commentsNumber: number;
}

export default async function CommentSectionWrapper({
  slug,
  commentsNumber,
}: ICommentSectionWrapperPropsType) {
  const sessionData = await getSessionData();

  if (!sessionData.authenticatedUserId) {
    return null;
  }

  const currentUser: CurrentUser = sessionData.authenticatedUserId
    ? {
        id: sessionData.authenticatedUserId!,
        name: sessionData.name!,
        email: sessionData.email!,
        image: sessionData.image!,
      }
    : null;

  const initialComments = await getCommentsForPosts({
    currentUserId: sessionData.authenticatedUserId!,
    postId: slug,
  });

  return (
    <div className="py-2">
      <h1 className="mb-4 mt-2 select-none text-sm font-semibold capitalize">
        Post Comments ({commentsNumber})
      </h1>
      <CommentTree
        initialComments={initialComments}
        currentUser={currentUser}
        postId={slug}
      />
    </div>
  );
}
