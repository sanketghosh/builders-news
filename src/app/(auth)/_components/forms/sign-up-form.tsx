"use client";

// packages
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { useState, useTransition } from "react";

// local modules
import { useToast } from "@/hooks/use-toast";
import {
  SignUpSchema,
  SignUpSchemaType,
} from "@/app/(auth)/_schemas/auth-schema";
import { signUpAction } from "@/app/(auth)/_actions/sign-up-action";

//components
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

export default function SignUpForm() {
  const { toast } = useToast();

  // states
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  /*   console.log("@@@SUCCESS: ", success);
  console.log("@@@ERROR: ", error); */

  // react hook form setting up and default values
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitHandler = async (values: SignUpSchemaType) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const result = await signUpAction(values);
      if (result.success) {
        setSuccess(result.success);
        toast({
          title: "Success",
          description: result.success,
        });
        setInterval(() => {}, 1000);
        router.push("/sign-in");
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
        title="BuildersNews - Sign Up"
        description="Create an account & share whatever you are building with others."
        footerText="If you already have an account find the button in the corner to sign in."
        footerHref="/sign-in"
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
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
              {isPending ? <Loader2Icon className="animate-spin" /> : "Sign Up"}
            </Button>
          </form>
        </Form>
      </AuthCardWrapper>
    </div>
  );
}

/*   const { data, error: _error } = await authClient.signUp.email(
      {
        email,
        password: confirmPassword,
        name,
        callbackURL: "/",
      },
      {
        onRequest: (ctx) => {
          setLoading(true);
        },
        onSuccess: (ctx) => {
          toast.success("User has been signed up successfully.");
          form.reset();
          setLoading(false);
          router.push("/signin");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          form.reset();
          setLoading(false);
        },
      }
    ); */
