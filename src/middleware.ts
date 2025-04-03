import { type NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session;

const NON_PROTECTED_PAGES = ["/sign-in", "/sign-up"];
const PROTECTED_PAGES = ["/post"];

export default async function authMiddleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // fetch user session
  const { data: session } = await axios.get<Session>(`/api/auth/get-session`, {
    baseURL: request.nextUrl.origin,
    headers: {
      // Get the cookie from the request
      cookie: request.headers.get("cookie") || "",
    },
  });

  const isAuthPage = NON_PROTECTED_PAGES.includes(pathname);
  const isProtectedPage = PROTECTED_PAGES.includes(pathname);

  // If the user is NOT logged in, prevent access to protected pages
  if (!session && isProtectedPage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // If the user IS logged in, prevent access to sign-in, sign-up, or home
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/post", request.url));
  }

  /*  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  } */
  return NextResponse.next();
}

export const config = {
  matcher: ["/post", "/sign-in", "/sign-up"],
};
