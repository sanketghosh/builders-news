// packages
import Link from "next/link";
import { ArrowLeftCircleIcon } from "lucide-react";

// local modules
import { getSessionData } from "@/utils/get-session";
import { cn } from "@/lib/utils";

// components
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UpdateName from "@/app/(main)/settings/_components/forms/update-name";
import UpdateEmail from "@/app/(main)/settings/_components/forms/update-email";
import UpdatePassword from "@/app/(main)/settings/_components/forms/update-password";
import DeleteAccountButton from "./_components/buttons/delete-account-button";

export default async function UpdateProfile() {
  const { email, name } = await getSessionData();

  return (
    <div className="max-w-full space-y-6">
      <h1 className="text-xl font-semibold">User Settings</h1>

      <Separator />

      <UpdateName name={name!} />
      <UpdateEmail email={email!} />
      <UpdatePassword />
      <Separator />

      <div className="flex items-center gap-4">
        <Link
          href={"/profile"}
          className={cn(
            buttonVariants({
              size: "default",
              variant: "secondary",
            }),
          )}
        >
          <ArrowLeftCircleIcon />
          Go Back
        </Link>
        {/*  */}
        <DeleteAccountButton />
      </div>
    </div>
  );
}
