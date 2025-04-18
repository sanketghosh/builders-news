import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRightIcon } from "lucide-react";
import MakePostForm from "./_components/make-post-form";

export default function MakePost() {
  return (
    <div className="space-y-2">
      <MakePostForm />
    </div>
  );
}
