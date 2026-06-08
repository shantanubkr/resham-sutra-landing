import type { TranslationKey } from "@/lib/i18n/translations";

export type NavItem = { href: string; labelKey: TranslationKey };

export const NAV_BY_ROLE: Record<string, NavItem[]> = {
  admin: [
    { href: "/admin/dashboard", labelKey: "dashboard" },
    { href: "/admin/clusters", labelKey: "clusters" },
    { href: "/admin/inventory", labelKey: "clusterInventory" },
    { href: "/admin/producers", labelKey: "producers" },
    { href: "/admin/onboard", labelKey: "onboard" },
    { href: "/admin/schemes", labelKey: "schemes" },
  ],
  cluster_head: [
    { href: "/admin/dashboard", labelKey: "dashboard" },
    { href: "/admin/clusters", labelKey: "myCluster" },
    { href: "/admin/inventory", labelKey: "clusterInventory" },
    { href: "/admin/producers", labelKey: "producers" },
    { href: "/admin/onboard", labelKey: "onboard" },
  ],
  field_operator: [
    { href: "/admin/dashboard", labelKey: "dashboard" },
    { href: "/admin/clusters", labelKey: "myCluster" },
    { href: "/admin/inventory", labelKey: "clusterInventory" },
    { href: "/admin/producers", labelKey: "producers" },
  ],
  producer: [
    { href: "/producer/card", labelKey: "myCard" },
    { href: "/producer/profile", labelKey: "profile" },
    { href: "/producer/schemes", labelKey: "schemes" },
    { href: "/producer/skills", labelKey: "skills" },
  ],
  buyer: [
    { href: "/buyer/search", labelKey: "browseNav" },
    { href: "/buyer/saved", labelKey: "savedListings" },
    { href: "/buyer/profile", labelKey: "profile" },
  ],
};
