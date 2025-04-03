import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSessionData } from "@/utils/get-session";
import Link from "next/link";

export default async function Navbar() {
  const { name, email, authenticatedUserId } = await getSessionData();

  return (
    <nav className="h-14 bg-primary">
      <div className="mx-auto flex h-full max-w-4xl select-none items-center justify-between px-4">
        <Link
          href={"/"}
          className="font-boldonse text-sm text-primary-foreground"
        >
          BuildersNews
        </Link>
        {authenticatedUserId ? (
          <div className="flex items-center gap-2">
            <Link
              href={"/make-post"}
              className={cn(
                buttonVariants({
                  size: "sm",
                  variant: "secondary",
                }),
              )}
            >
              Make Post
            </Link>
            <Link href={"/profile"}>
              <Avatar>
                <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        ) : (
          <Link
            href={"/sign-up"}
            className={cn(
              buttonVariants({
                variant: "secondary",
                size: "sm",
              }),
            )}
          >
            Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
}
