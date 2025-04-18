"use client";

// packages
import Link from "next/link";
import { useState } from "react";
import { ArrowUpDownIcon, CornerDownRightIcon } from "lucide-react";

// local modules
import { SortOrderType } from "@/types";
import { FetchedPostType } from "@/app/(main)/_types";

// components
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface IPostListProps {
  posts: FetchedPostType[];
}

export default function PostList({ posts }: IPostListProps) {
  const [sortOrder, setSortOrder] = useState<SortOrderType>("latest");

  const sortedForms = posts.sort((a: FetchedPostType, b: FetchedPostType) => {
    if (sortOrder === "latest")
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortOrder === "oldest")
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return 0;
  });

  const handleSortChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "latest" ? "oldest" : "latest"));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end space-x-3">
        <Button variant={"secondary"} size={"sm"} onClick={handleSortChange}>
          <ArrowUpDownIcon />
          {sortOrder === "latest" ? "Oldest" : "Latest"} Posts
        </Button>
      </div>
      <Separator />
      <div>
        {posts.map((i) => (
          <div className="space-y-2 border-b py-3" key={i.id}>
            <div>
              <Link href={`/post/${i.id}`} className="flex items-center">
                <CornerDownRightIcon className="mr-1 size-4 shrink-0 stroke-primary stroke-2 p-0 md:mr-1.5 md:size-5" />
                <p className="line-clamp-1 text-sm font-semibold leading-tight underline transition-colors hover:text-blue-600 md:text-base">
                  {i.title}
                </p>
              </Link>
            </div>
            <div className="flex select-none items-center gap-3 text-xs font-medium text-muted-foreground">
              <p>
                <span>{i.postLikes.length}</span> likes
              </p>
              <p> by {i.author.email}</p>
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
