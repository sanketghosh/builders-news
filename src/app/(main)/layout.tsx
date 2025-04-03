import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "./_components/navbar";

export const metadata: Metadata = {
  title: "BuildersNews | Feed",
  description: "Feed of BuildersNews, see what people are sharing, discussing.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen w-full">
      <Navbar />
      <div className="mx-auto max-w-4xl">
        <div className="px-4 py-4">{children}</div>
      </div>
    </main>
  );
}
