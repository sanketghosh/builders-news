"use client";

// packages
import { Loader2Icon } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// local modules
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";
import {
  UpdateEmailSchema,
  UpdateEmailSchemaType,
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

interface IUpdateEmailPropsType {
  email: string;
}

export default function UpdateEmail({ email }: IUpdateEmailPropsType) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<UpdateEmailSchemaType>({
    resolver: zodResolver(UpdateEmailSchema),
    values: {
      email: email,
    },
  });

  const handleFormSubmit = (value: UpdateEmailSchemaType) => {
    // console.log("@@@-->>  UPDATE EMAIL: ", values);
    startTransition(async () => {
      try {
        await authClient.changeEmail({
          newEmail: value.email,
          callbackURL: "/",
        });
        toast({
          title: "SUCCESS!",
          description: "User's email has been updated successfully.",
        });
      } catch (error) {
        toast({
          title: "ERROR!",
          description: "Failed to update user's email address.",
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="johndoe@mail.com"
                  type="email"
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
              <Loader2Icon className="animate-spin" />
              Updating
            </>
          ) : (
            "Update Email"
          )}
        </Button>
      </form>
    </Form>
  );
}
