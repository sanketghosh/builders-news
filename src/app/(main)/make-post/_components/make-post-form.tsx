"use client";

// packages
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

// local modules
import {
  MakePostSchema,
  MakePostSchemaType,
} from "@/app/(main)/make-post/_schemas";
import { useToast } from "@/hooks/use-toast";
import { makePostAction } from "@/app/(main)/make-post/_actions/make-post-action";

// components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function MakePostForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<MakePostSchemaType>({
    resolver: zodResolver(MakePostSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const handlePostComment = (values: MakePostSchemaType) => {
    startTransition(async () => {
      const result = await makePostAction(values);
      if (result.success) {
        toast({
          title: "Success!",
          description: result.success,
        });
        setInterval(() => {}, 1000);
        router.push("/");
      } else {
        toast({
          variant: "destructive",
          title: "Error!",
          description: result.error,
        });
      }
    });
  };

  return (
    <div className="space-y-4 py-6">
      <h1 className="text-base font-medium md:text-lg lg:text-xl">
        What is on your mind ? Write a post.
      </h1>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handlePostComment)}
          className="space-y-3 md:space-y-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Your post title should be here."
                    type="text"
                    className="text-sm"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Body</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Write the post in details."
                    className="min-h-80 text-sm"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button>
              {isPending ? (
                <>
                  Loading
                  <Loader2Icon className="animate-spin" />
                </>
              ) : (
                "Create Post"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
