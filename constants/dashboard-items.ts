import {
  Pen,
  ShieldHalf,
  UserPlus2,
  PenSquare,
  Bug,
  Users,
  Newspaper,
  Speaker,
} from "lucide-react";

export const DASHBOARD_NAVS = [
  {
    title: "Intro Text",
    Icon: Pen,
    value: "add_intro" as const,
    href: "/dashboard/intro-text",
  },
  {
    title: "Client",
    Icon: UserPlus2,
    value: "add_client" as const,
    href: "/dashboard/client",
  },
  {
    title: "Member",
    Icon: ShieldHalf,
    value: "add_member" as const,
    href: "/dashboard/team",
  },
  {
    title: "Publications",
    Icon: Speaker,
    value: "publications" as const,
    href: "/dashboard/publication",
  },
  {
    title: "Post",
    Icon: PenSquare,
    value: "create-post" as const,
    href: "/dashboard/post",
  },
  {
    title: "Issues",
    Icon: Bug,
    value: "fix_issue" as const,
    href: "/dashboard/issues",
  },

  {
    title: "Users",
    Icon: Users,
    value: "all_users" as const,
    href: "/dashboard/users",
  },
  {
    title: "Emails",
    Icon: Newspaper,
    value: "newsLetter" as const,
    href: "/dashboard/emails",
  },
];
