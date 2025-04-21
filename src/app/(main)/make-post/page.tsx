import MakePostForm from "./_components/make-post-form";
import { getSessionData } from "@/utils/get-session";

export async function generateMetadata() {
  const { email, name } = await getSessionData();

  return {
    title: `Make A Post ${name}`,
    description: `Here you can make a post ${name}, your email: ${email}, will be visible in post.`,
  };
}

export default function MakePost() {
  return (
    <div className="space-y-2">
      <MakePostForm />
    </div>
  );
}
