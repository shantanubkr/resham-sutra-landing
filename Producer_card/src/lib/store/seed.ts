import type { Database } from "@/lib/types";
import clusters from "@/data/seed/clusters.json";
import skills from "@/data/seed/skills.json";
import schemes from "@/data/seed/schemes.json";
import users from "@/data/seed/users.json";
import producers from "@/data/seed/producers.json";
import trainings from "@/data/seed/trainings.json";
import producerSchemes from "@/data/seed/producer-schemes.json";
import buyers from "@/data/seed/buyers.json";
import savedProducers from "@/data/seed/saved-producers.json";
import clusterInventory from "@/data/seed/cluster-inventory.json";

export function createSeedDatabase(): Database {
  return {
    users: users as Database["users"],
    sessions: [],
    clusters: clusters as Database["clusters"],
    skills: skills as Database["skills"],
    producers: producers as Database["producers"],
    trainings: trainings as Database["trainings"],
    schemes: schemes as Database["schemes"],
    producerSchemes: producerSchemes as Database["producerSchemes"],
    buyers: buyers as Database["buyers"],
    savedProducers: savedProducers as Database["savedProducers"],
    savedListings: [],
    govTokens: [
      {
        token: "demo-gov-2026",
        label: "Demo Government Dashboard",
        createdAt: new Date().toISOString(),
        expiresAt: null,
      },
    ],
    interestRequests: [],
    clusterInventory: clusterInventory as Database["clusterInventory"],
    producerCodeCounter: 15,
  };
}
