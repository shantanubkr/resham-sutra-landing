import { PageCTA } from "@/components/ui/PageCTA";

export function AboutCTA() {
  return (
    <PageCTA
      badge="Work with us"
      badgeDot="green"
      title="Ready to work together?"
      description="Whether you are a government body, NGO, or CSR team, we would like to hear from you. Tell us who you are and what you are looking to achieve."
      primaryHref="/contact"
      primaryLabel="Partner With Us"
      secondaryHref="/programs"
      secondaryLabel="Explore Our Programs"
    />
  );
}
