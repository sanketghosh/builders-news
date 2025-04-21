// local modules
import { getProfileUserDataById } from "@/app/(main)/profile/[slug]/_data-fetchers/get-profile-user-data-by-id";

// components
import ProfileDataCard from "@/app/(main)/profile/[slug]/_components/profile-data-card";
import UsersPostsList from "@/app/(main)/profile/[slug]/_components/users-posts-list";

interface IUserProfilePropsType {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: IUserProfilePropsType) {
  const { profileUserData } = await getProfileUserDataById(slug);

  return {
    title: `Profile | ${profileUserData?.name}`,
    description: `User's name is ${profileUserData?.name} and email ${profileUserData?.email}`,
  };
}

export default async function Profile({ params }: IUserProfilePropsType) {
  const { slug } = await params;
  //   const { name, email, image } = await getSessionData();

  const { profileUserData } = await getProfileUserDataById(slug);

  console.log("@@@USER PROFILE: ", slug);

  return (
    <div className="space-y-6">
      <ProfileDataCard
        email={profileUserData?.email!}
        name={profileUserData?.name!}
      />
      <UsersPostsList slug={slug} />
    </div>
  );
}
