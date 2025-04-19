"use client";

// packages
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Loader2Icon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

// local modules
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";
import {
  UpdateNameSchema,
  UpdateNameSchemaType,
} from "@/app/(main)/settings/_schemas";

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
import { Button } from "@/components/ui/button";

interface IUpdateNamePropsType {
  name: string;
}

export default function UpdateName({ name }: IUpdateNamePropsType) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<UpdateNameSchemaType>({
    resolver: zodResolver(UpdateNameSchema),
    values: {
      name: name,
    },
  });

  const handleFormSubmit = (value: UpdateNameSchemaType) => {
    // console.log("@@@-->>  UPDATE NAME: ", values);
    startTransition(async () => {
      try {
        await authClient.updateUser({
          name: value.name,
        });
        toast({
          title: "SUCCESS!",
          description: "User's name has been updated successfully.",
        });
      } catch (error) {
        toast({
          title: "ERROR!",
          description: "Failed to update user's name.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-4 rounded-lg border p-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="John Doe"
                  type="text"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size={"default"} variant={"default"} disabled={isPending}>
          {isPending ? (
            <>
              <Loader2Icon />
              Updating
            </>
          ) : (
            "Update Name"
          )}
        </Button>
      </form>
    </Form>
  );
}
