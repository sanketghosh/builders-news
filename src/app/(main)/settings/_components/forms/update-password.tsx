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
  ChangePasswordSchema,
  ChangePasswordSchemaType,
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

export default function UpdatePassword() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
    values: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const handleFormSubmit = (values: ChangePasswordSchemaType) => {
    startTransition(async () => {
      try {
        await authClient.changePassword({
          newPassword: values.confirmNewPassword,
          currentPassword: values.currentPassword,
          revokeOtherSessions: true,
        });
        toast({
          title: "SUCCESS!",
          description: "Password has been updated successfully.",
        });
      } catch (error) {
        toast({
          title: "ERROR!",
          description:
            "Something went wrong! Check the existing password or try again.",
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
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="n2ixpYtxJUwhRA"
                  type="password"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter New Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="2nODepaeRKkqiw"
                  type="password"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="2nODepaeRKkqiw"
                  type="password"
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
            "Update Password"
          )}
        </Button>
      </form>
    </Form>
  );
}
