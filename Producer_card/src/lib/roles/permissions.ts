import type { AuthUser, Producer, UserRole } from "@/lib/types";

export const STAFF_ROLES: UserRole[] = ["admin", "cluster_head", "field_operator"];

export function isStaffRole(role: UserRole): boolean {
  return STAFF_ROLES.includes(role);
}

export function canAccessAdminShell(role: UserRole): boolean {
  return isStaffRole(role);
}

/** Full cluster management — onboard, edit producers, inventory */
export function canManageCluster(user: AuthUser, clusterId: string): boolean {
  if (user.role === "admin") return true;
  if (user.role === "cluster_head") {
    return user.clusterIds.length === 1 && user.clusterIds[0] === clusterId;
  }
  return false;
}

export function canEditProducer(user: AuthUser, producer: Producer): boolean {
  return canManageCluster(user, producer.clusterId);
}

export function canViewProducer(user: AuthUser, producer: Producer): boolean {
  if (user.role === "admin") return true;
  if (user.role === "cluster_head" || user.role === "field_operator") {
    return user.clusterIds.includes(producer.clusterId);
  }
  if (user.role === "producer") return user.producerId === producer.id;
  if (user.role === "buyer") return true;
  return false;
}

export function canLogTraining(user: AuthUser, producer: Producer): boolean {
  if (user.role === "admin") return true;
  if (user.role === "cluster_head" || user.role === "field_operator") {
    return user.clusterIds.includes(producer.clusterId);
  }
  return false;
}

export function filterProducersByRole<T extends Producer>(
  producers: T[],
  user: AuthUser
): T[] {
  if (user.role === "admin") return producers;
  if (user.role === "cluster_head" || user.role === "field_operator") {
    return producers.filter((p) => user.clusterIds.includes(p.clusterId));
  }
  if (user.role === "producer" && user.producerId) {
    return producers.filter((p) => p.id === user.producerId);
  }
  return producers;
}

export function filterClustersByRole<T extends { id: string }>(
  clusters: T[],
  user: AuthUser
): T[] {
  if (user.role === "admin") return clusters;
  if (user.role === "cluster_head" || user.role === "field_operator") {
    return clusters.filter((c) => user.clusterIds.includes(c.id));
  }
  return clusters;
}
