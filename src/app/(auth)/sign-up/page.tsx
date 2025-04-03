// packages
import Link from "next/link";

// local modules
import { cn } from "@/lib/utils";

// components
import SignUpForm from "@/app/(auth)/_components/forms/sign-up-form";
import { buttonVariants } from "@/components/ui/button";

export default function SignUp() {
  return (
    <div className="h-screen">
      <div className="flex h-full flex-row-reverse">
        <div className="relative hidden h-full flex-1 select-none bg-primary text-primary-foreground lg:flex lg:flex-col lg:items-center lg:justify-center">
          <h1 className="font-boldonse text-3xl">BuildersNews</h1>
          <p className="mt-2 max-w-md text-center font-semibold">
            Share whatever you are building with the world.
          </p>
        </div>
        <div className="relative flex flex-1 flex-col items-center justify-center space-y-6">
          <Link
            href={"/sign-in"}
            className={cn(
              buttonVariants({
                variant: "default",
              }),
              "absolute left-2 top-4",
            )}
          >
            Sign In
          </Link>

          <SignUpForm />
          <p className="max-w-sm px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
