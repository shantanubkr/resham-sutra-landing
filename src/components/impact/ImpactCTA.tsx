import { PageCTA } from "@/components/ui/PageCTA";

export function ImpactCTA() {
  return (
    <PageCTA
      badge="Write the next story"
      badgeDot="green"
      title="Help write the next story"
      description="Every partnership starts with a conversation. Tell us who you are and what you want to achieve, and we will show you what is possible in your region."
      primaryHref="/contact"
      primaryLabel="Partner With Us"
      secondaryHref="/programs"
      secondaryLabel="See Our Programs"
    />
  );
}
