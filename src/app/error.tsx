"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightIcon } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-96 space-y-3 rounded-md border bg-secondary/30 p-4 shadow-lg md:w-[500px] md:rounded-lg">
        <h1 className="text-lg font-semibold md:text-xl">
          Something went wrong.
        </h1>
        <p className="leading-tight text-muted-foreground">
          Might be some internal error or you can try again by refreshing the
          page.
        </p>
      </div>
    </div>
  );
}
