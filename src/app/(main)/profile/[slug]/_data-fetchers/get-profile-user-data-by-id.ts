import { prisma } from "@/lib/prisma";

export const getProfileUserDataById = async (slug: string) => {
  const profileUserData = await prisma.user.findUnique({
    where: {
      id: slug,
    },
  });

  return {
    profileUserData,
  };
};
