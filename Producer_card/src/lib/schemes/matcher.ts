import type { Producer, ProducerCategory, Scheme } from "@/lib/types";

function ageFromDob(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

function ageMatches(producer: Producer, scheme: Scheme): boolean {
  if (!producer.dateOfBirth) return true;
  const age = ageFromDob(producer.dateOfBirth);
  if (scheme.eligibilityAgeMin != null && age < scheme.eligibilityAgeMin)
    return false;
  if (scheme.eligibilityAgeMax != null && age > scheme.eligibilityAgeMax)
    return false;
  return true;
}

function genderMatches(producer: Producer, scheme: Scheme): boolean {
  if (!scheme.eligibilityGender || scheme.eligibilityGender === "any")
    return true;
  return producer.gender === scheme.eligibilityGender;
}

function categoryMatches(producer: Producer, scheme: Scheme): boolean {
  if (scheme.eligibilitySkillCategories.length === 0) return true;
  const cats =
    producer.categoryIds?.length > 0
      ? producer.categoryIds
      : [producer.category];
  return scheme.eligibilitySkillCategories.some((c) => cats.includes(c));
}

export function matchSchemesForProducer(
  producer: Producer,
  schemes: Scheme[]
): string[] {
  return schemes
    .filter((s) => s.isActive)
    .filter(
      (s) =>
        genderMatches(producer, s) &&
        categoryMatches(producer, s) &&
        ageMatches(producer, s)
    )
    .map((s) => s.id);
}

export async function applyAutoSchemeMatching(
  db: Awaited<ReturnType<typeof import("@/lib/store").readDatabase>>,
  producerId: string
) {
  const producer = db.producers.find((p) => p.id === producerId);
  if (!producer) return;

  const matched = matchSchemesForProducer(producer, db.schemes);
  const now = new Date().toISOString();

  db.producerSchemes = db.producerSchemes.filter(
    (ps) => ps.producerId !== producerId || ps.taggedBy === "admin_manual"
  );

  for (const schemeId of matched) {
    const exists = db.producerSchemes.some(
      (ps) =>
        ps.producerId === producerId &&
        ps.schemeId === schemeId &&
        ps.taggedBy === "admin_manual"
    );
    if (!exists) {
      db.producerSchemes.push({
        producerId,
        schemeId,
        taggedBy: "auto_match",
        taggedAt: now,
      });
    }
  }
}
