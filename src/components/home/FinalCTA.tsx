import { PageCTA } from "@/components/ui/PageCTA";

export function FinalCTA() {
  return (
    <PageCTA
      badge="Let's work together"
      title="Ready to build something together?"
      description="Whether you're exploring a district deployment, CSR partnership, or NGO collaboration. Tell us who you are and what you're looking to achieve."
      primaryHref="/contact"
      primaryLabel="Partner With Us"
      secondaryHref="/impact"
      secondaryLabel="Explore Our Impact"
    />
  );
}
