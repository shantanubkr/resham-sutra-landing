import type { UserRole } from "@/lib/types";

/** Can view admin dashboard & cluster data */
export const STAFF_VIEW_ROLES: UserRole[] = [
  "admin",
  "cluster_head",
  "field_operator",
];

/** Can create/edit producers, inventory, cluster managers */
export const STAFF_MANAGE_ROLES: UserRole[] = ["admin", "cluster_head"];
