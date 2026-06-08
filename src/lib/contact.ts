export const VISITOR_TYPES = [
  {
    id: "ngo",
    label: "NGO",
    description: "Looking for a field implementation partner",
    prompt:
      "Tell us about your geography and mandate. We will share whether our cluster model fits your region and timeline.",
  },
  {
    id: "csr",
    label: "CSR / Company",
    description: "Deploying a CSR budget with documented impact",
    prompt:
      "Share your budget range and focus areas. We will outline a CSR-compliant program with clear reporting.",
  },
  {
    id: "government",
    label: "Government Body",
    description: "Exploring district or state-level deployment",
    prompt:
      "Tell us your state and district of interest. We will share relevant MoU experience and rollout options.",
  },
  {
    id: "individual",
    label: "Individual",
    description: "Exploring ways to support our work",
    prompt:
      "Let us know what you are interested in funding or learning about. We will guide you to the right next step.",
  },
] as const;

export type VisitorTypeId = (typeof VISITOR_TYPES)[number]["id"];
