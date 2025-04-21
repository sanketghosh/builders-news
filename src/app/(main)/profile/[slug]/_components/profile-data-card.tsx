// packages
import Link from "next/link";
import { SettingsIcon } from "lucide-react";

// local modules
import { cn } from "@/lib/utils";
import { getSessionData } from "@/utils/get-session";
import { buttonVariants } from "@/components/ui/button";

// components
import LogoutButton from "@/app/(main)/settings/_components/buttons/logout-button";

interface IProfileDataCardPropsType {
  name: string;
  email: string;
}

export default async function ProfileDataCard({
  email,
  name,
}: IProfileDataCardPropsType) {
  const { email: authenticatedUserEmail } = await getSessionData();

  return (
    <div className="rounded-md border p-4">
      <div>
        <h2 className="text-base font-semibold md:text-lg">{name}</h2>
        <p className="text-sm font-medium text-muted-foreground md:text-base">
          {email}
        </p>
      </div>

      {email === authenticatedUserEmail && (
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
      )}
    </div>
  );
}
