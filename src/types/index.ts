export type SortOrderType = "latest" | "oldest";

export type SessionDataType = {
  sessionCreatedAt: Date | undefined;
  sessionExpiresAt: Date | undefined;
  authenticatedUserId: string | undefined;
  name: string | undefined;
  email: string | undefined;
  image: string | null | undefined;
};

export type NavbarDataType = {
  href: string;
  label: string;
  variant: string;
};
