// packages
import Link from "next/link";

// local modules
import { cn } from "@/lib/utils";

// components
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-56px)] flex-col items-center justify-center space-y-4">
      <h2 className="text-3xl font-bold md:text-xl">Page Not Found</h2>
      <p className="max-w-lg text-center text-lg font-medium tracking-tight text-muted-foreground">
        The page is missing or you might be restricted from viewing requested
        resource
      </p>
      <Link
        href="/"
        className={cn(
          buttonVariants({
            variant: "default",
          }),
        )}
      >
        Return Home
      </Link>
    </div>
  );
}
