"use client";

// packages
import Link from "next/link";
import { useState, useTransition } from "react";
import {
  ArrowUpDownIcon,
  CornerDownRightIcon,
  Loader2Icon,
  SearchIcon,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

// local modules
import { SortOrderType } from "@/types";
import { FetchedPostType } from "@/app/(main)/_types";

// components
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

interface IPostListProps {
  posts: FetchedPostType[];
  searchQuery?: string;
  sort: SortOrderType;
}

export default function PostList({
  posts,
  searchQuery: initialSearchQuery,
  sort: initialSortOrderType,
}: IPostListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sortOrder, setSortOrder] =
    useState<SortOrderType>(initialSortOrderType);
  const [searchQuery, setSearchQuery] = useState<string>(
    initialSearchQuery || "",
  );
  const [isPending, startTransition] = useTransition();

  /*  const sortedForms = posts.sort((a: FetchedPostType, b: FetchedPostType) => {
    if (sortOrder === "latest")
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortOrder === "oldest")
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return 0;
  });
 */

  const updateUrlParams = (newSort: SortOrderType, newSearch: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", newSort);

    if (newSearch.trim()) {
      params.set("searchQuery", newSearch.trim());
    } else {
      params.delete("searchQuery");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  const handleSortChange = () => {
    const newSortOrder = sortOrder === "latest" ? "oldest" : "latest";
    setSortOrder(newSortOrder);
    updateUrlParams(newSortOrder, searchQuery);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    updateUrlParams(sortOrder, searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div className="space-y-6">
      <form className="flex w-full items-center gap-2">
        <Input
          placeholder="Search posts in the feed..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyDown={handleKeyDown}
          disabled={isPending}
        />
        <Button
          size={"icon"}
          className="shrink-0"
          onClick={handleSearchSubmit}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <SearchIcon />
          )}
        </Button>
      </form>
      <div className="flex items-center justify-end space-x-3">
        <Button variant={"secondary"} size={"sm"} onClick={handleSortChange}>
          <ArrowUpDownIcon />
          {sortOrder === "latest" ? "Oldest" : "Latest"} Posts
        </Button>
      </div>
      <Separator />
      <h2 className="text-sm font-semibold text-muted-foreground">
        {initialSearchQuery && initialSearchQuery.length > 0 ? (
          <span>
            Showing results for{" "}
            <span className="text-foreground">{initialSearchQuery}</span>
          </span>
        ) : null}
      </h2>
      <div>
        {isPending && <p className="text-muted-foreground">Loading...</p>}
        {!isPending && posts.length === 0 && (
          <p className="text-muted-foreground">No matching posts found...</p>
        )}
        {posts.map((post) => (
          <div className="space-y-2 border-b py-3" key={post.id}>
            <div>
              <Link href={`/post/${post.id}`} className="flex items-center">
                <CornerDownRightIcon className="mr-1 size-4 shrink-0 stroke-primary stroke-2 p-0 md:mr-1.5 md:size-5" />
                <p className="line-clamp-1 text-sm font-semibold leading-tight underline transition-colors hover:text-blue-600 md:text-base">
                  {post.title}
                </p>
              </Link>
            </div>
            <div className="flex select-none items-center gap-3 text-xs font-medium text-muted-foreground">
              <p>
                <span>{post._count.postLikes}</span> likes
              </p>
              {/* <p> by {post.author.email}</p> */}
              <Link
                href={`/profile/${post.author.id}`}
                className="transition-all hover:text-blue-600"
              >
                {post.author.email}
              </Link>
              <p className="capitalize">
                on {new Date().toDateString().toLowerCase()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
