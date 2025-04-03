import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ArrowBigRightDashIcon,
  Circle,
  CornerDownRightIcon,
  DotIcon,
  PenIcon,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";

export default function Feed() {
  return (
    <div className="space-y-8">
      <form className="flex w-full items-center gap-2">
        <Input placeholder="Search posts in the feed..." />
        <Button size={"icon"} className="shrink-0">
          <SearchIcon />
        </Button>
      </form>
      <Separator />
      <section>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div className="space-y-2 border-b py-3" key={i}>
            <div>
              <Link href={"/post/:id"} className="flex items-center">
                <CornerDownRightIcon className="mr-1 size-4 shrink-0 stroke-primary stroke-2 p-0 md:mr-1.5 md:size-5" />
                <p className="line-clamp-1 text-sm font-semibold leading-tight underline transition-colors hover:text-blue-600 md:text-base">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum,
                  amet? Lorem, ipsum dolor.
                </p>
              </Link>
            </div>
            <div className="flex select-none items-center gap-3 text-xs font-medium text-muted-foreground">
              <p>
                <span>20</span> likes
              </p>
              <p> by @username</p>
              <p>on {new Date().toDateString().toLowerCase()}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
