import { ElementsType } from "@/app/(main)/create-form/_types";

export type NavbarDataType = {
  href: string;
  label: string;
  variant:
    | "secondary"
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "ghost"
    | null
    | undefined;
};

export type SessionDataType = {
  sessionCreatedAt: Date | undefined;
  sessionExpiresAt: Date | undefined;
  authenticatedUserId: string | undefined;
  name: string | undefined;
  email: string | undefined;
  image: string | null | undefined;
};

export type StatsCardsType = {
  title: string;
  desc?: string;
  statsNumber: number;
  isPercentage: boolean;
};

export type SortOrderType = "latest" | "oldest";
export type SortStatusType = "all" | "published" | "unpublished";

export type ColumnType = {
  id: string;
  label: string;
  required: boolean;
  type: ElementsType;
};
export type RowType = { [key: string]: string } & {
  submittedAt: Date;
};
