import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  HeartIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
} from "lucide-react";
import NestedComments from "./_components/comment-section";

export default function SinglePost() {
  return (
    <div className="py-4">
      {/* header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="leading-tight">
          <h2 className="font-medium">@username</h2>
          <p className="text-xs font-medium text-muted-foreground">
            Posted on {new Date().toDateString()}
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
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae
          eveniet explicabo dignissimos.
        </h1>
        <p className="mt-3 text-sm text-foreground/70 md:text-base">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, officia
          doloribus? Fugit labore quidem enim, deserunt cupiditate consequuntur!
          Minima, id! Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Molestias laborum hic soluta rem quo similique est reprehenderit
          maxime deleniti maiores animi, atque tempore quas at harum autem quae
          repudiandae dicta debitis praesentium! Iste adipisci blanditiis
          deleniti sunt, sit at possimus.
        </p>
      </div>
      {/* footer */}
      <div className="space-x-4 border-b py-4 font-medium text-muted-foreground">
        <Button size={"sm"} variant={"secondary"}>
          <HeartIcon className="fill-muted-foreground stroke-none" />
          200
        </Button>
        <Button size={"sm"} variant={"secondary"}>
          <MessageSquareIcon className="fill-muted-foreground stroke-none" />
          3440
        </Button>
      </div>
      {/*  comment section */}
      <div className="py-2">
        {/* comment form */}
        <form action="" className="space-y-2 border-b py-4">
          <Textarea placeholder="Add comment" className="h-28" />
          <Button size={"sm"}>Add Comment</Button>
        </form>
        <NestedComments />
      </div>
    </div>
  );
}
