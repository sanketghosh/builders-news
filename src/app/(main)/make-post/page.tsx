import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRightIcon } from "lucide-react";

export default function MakePost() {
  return (
    <div className="space-y-2">
      <Textarea
        name=""
        id=""
        placeholder="Write your post"
        className="min-h-80 text-sm"
      />
      <Button size={"sm"}>Create Post</Button>
    </div>
  );
}
