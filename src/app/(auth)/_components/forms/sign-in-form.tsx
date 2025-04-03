"use client";

// packages
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Loader2Icon } from "lucide-react";

// local modules
import { useToast } from "@/hooks/use-toast";
import { signInAction } from "@/app/(auth)/_actions/sign-in-action";
import {
  SignInSchema,
  SignInSchemaType,
} from "@/app/(auth)/_schemas/auth-schema";

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
import AuthCardWrapper from "@/app/(auth)/_components/cards/auth-card";

export default function SignInForm() {
  const { toast } = useToast();

  // states
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  /*   console.log("@@@SUCCESS: ", success);
  console.log("@@@ERROR: ", error); */

  // react hook form setting up and default values
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitHandler = async (values: SignInSchemaType) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const result = await signInAction(values);
      if (result.success) {
        setSuccess(result.success);
        toast({
          title: "Success!",
          description: result.success,
        });
        setInterval(() => {}, 1000);
        router.push("/feed");
      } else {
        setError(result.error);
        toast({
          variant: "destructive",
          title: "Error!",
          description: result.error,
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <AuthCardWrapper
        title="BuildersNews - Sign In"
        description="Restart from exactly where you left last time, just signin"
        footerText="If you do not have an account click the sign up button in the corner."
        footerHref="/sign-up"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitHandler)}>
            <div className="space-y-3 md:space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="C5AjJHe9FQvLlg"
                        type="password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="mt-3 w-full md:mt-4">
              {isPending ? <Loader2Icon className="animate-spin" /> : "Sign In"}
            </Button>
          </form>
        </Form>
      </AuthCardWrapper>
    </div>
  );
}
