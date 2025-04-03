import { auth } from "@/lib/auth";
import { SessionDataType } from "@/types";
import { headers } from "next/headers";

export const getSessionData = async (): Promise<SessionDataType> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    sessionCreatedAt: session?.session.createdAt,
    sessionExpiresAt: session?.session.expiresAt,
    authenticatedUserId: session?.user.id,
    name: session?.user.name,
    email: session?.user.email,
    image: session?.user.image,
  };
};
