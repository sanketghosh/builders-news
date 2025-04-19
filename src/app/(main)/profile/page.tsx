import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getSessionData } from "@/utils/get-session";
import { PenIcon } from "lucide-react";
import UserDataCard from "./_components/user-data-card";

export default async function Profile() {
  const { name, email, image } = await getSessionData();

  return (
    <div>
      <UserDataCard email={email!} name={name!} />
    </div>
  );
}
