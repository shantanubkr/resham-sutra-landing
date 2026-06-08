import type { BuyerProductType } from "@/lib/types";
import type { BuyerProductGroup, SilkVariety } from "@/lib/buyers/products";
import { BUYER_PRODUCT_META } from "@/lib/buyers/products";

export const SILK_PALETTE: Record<
  SilkVariety | "default",
  { bg: string; accent: string; light: string; label: string }
> = {
  eri: { bg: "#E8DFD0", accent: "#8B7355", light: "#F5F0E8", label: "Eri" },
  muga: { bg: "#E8D49A", accent: "#B8860B", light: "#FBF6E8", label: "Muga" },
  mulberry: { bg: "#EDE8E2", accent: "#6B6560", light: "#FAFAF8", label: "Mulberry" },
  tassar: { bg: "#DDD0C0", accent: "#8B6914", light: "#F3EDE4", label: "Tassar" },
  default: { bg: "#E5E5E5", accent: "#525252", light: "#F5F5F5", label: "Silk" },
};

export function productImagePath(productType: BuyerProductType): string {
  return `/products/${productType.replace(/_/g, "-")}.svg`;
}

export function productSilkVariety(
  productType: BuyerProductType
): SilkVariety | null {
  return BUYER_PRODUCT_META[productType].silkVariety ?? null;
}

export function productGroupLabel(group: BuyerProductGroup): string {
  const labels: Record<BuyerProductGroup, string> = {
    yarn: "Yarn",
    fabric: "Fabric",
    cocoons: "Cocoons",
    finished: "Finished",
  };
  return labels[group];
}

export function paletteForProduct(productType: BuyerProductType) {
  const variety = productSilkVariety(productType);
  return variety ? SILK_PALETTE[variety] : SILK_PALETTE.default;
}
