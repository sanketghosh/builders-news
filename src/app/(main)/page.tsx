// packages

// local modules
import { SortOrderType } from "@/types";
import { getAllPosts } from "@/app/(main)/_data-fetchers/get-all-posts";

// components
import PostList from "@/app/(main)/_components/posts/post-list";

interface FeedSearchParams {
  searchParams: Promise<{
    searchQuery?: string;
    sort: SortOrderType;
  }>;
}

export default async function Feed({ searchParams }: FeedSearchParams) {
  const { searchQuery, sort = "latest" } = await searchParams;

  console.log("@@@SEARCH QUERY: ", searchQuery);
  console.log("@@@SORT QUERY: ", sort);

  const { data } = await getAllPosts({
    sort: sort,
    searchQuery: searchQuery,
  });

  return (
    <div>
      <PostList sort={sort} searchQuery={searchQuery} posts={data} />
    </div>
  );
}
