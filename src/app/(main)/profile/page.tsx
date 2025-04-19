import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSessionData } from "@/utils/get-session";
import { LogOutIcon, PenIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import LogoutButton from "../settings/_components/buttons/logout-button";

export default async function Profile() {
  const { name, email, image } = await getSessionData();

  return (
    <div>
      <div className="rounded-md border p-4">
        <div>
          <h2 className="text-base font-semibold md:text-lg">{name}</h2>
          <p className="text-sm font-medium text-muted-foreground md:text-base">
            {email}
          </p>
        </div>

        <div className="mt-4 flex items-center space-x-4">
          <LogoutButton />
          <Link
            href={"/settings"}
            className={cn(
              buttonVariants({
                size: "sm",
                variant: "secondary",
              }),
            )}
          >
            <SettingsIcon />
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
