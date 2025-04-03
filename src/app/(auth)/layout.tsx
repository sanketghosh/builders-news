import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BuildersNews | Authentication",
  description: "Share what you are building, discuss with like minded people.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="px-4 lg:px-0">{children}</div>;
}
