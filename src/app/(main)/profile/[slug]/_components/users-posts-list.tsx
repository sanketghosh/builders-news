// packages
import Link from "next/link";

// local modules
import { getUserPosts } from "@/app/(main)/profile/[slug]/_data-fetchers/get-user-posts";

interface IUserPostsListPropsType {
  slug: string;
}

export default async function UsersPostsList({
  slug,
}: IUserPostsListPropsType) {
  const postsByUser = await getUserPosts(slug);

  return (
    <div>
      <div className="space-y-4">
        {postsByUser?.map((post) => (
          <div key={post.id} className="rounded-md border px-4 py-2">
            <Link
              href={`/post/${post.id}`}
              className="text-sm font-semibold transition-all hover:text-blue-600 md:text-base"
            >
              {post.title}
            </Link>
            {/* <p className="line-clamp-2 text-sm font-medium text-muted-foreground">
              {post.body}
            </p> */}
            <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
              <p>Likes ({post._count.postLikes})</p>
              <p>Comments ({post._count.comments})</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
