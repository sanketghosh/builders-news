// packages
import { SearchIcon } from "lucide-react";

// local modules
import { prisma } from "@/lib/prisma";

// components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PostList from "@/app/(main)/_components/posts/post-list";
import { getAllPosts } from "./_data-fetchers/get-all-posts";

export default async function Feed() {
  const { data } = await getAllPosts("latest");

  return (
    <div className="space-y-8">
      <form className="flex w-full items-center gap-2">
        <Input placeholder="Search posts in the feed..." />
        <Button size={"icon"} className="shrink-0">
          <SearchIcon />
        </Button>
      </form>
      <PostList posts={data} />
    </div>
  );
}
