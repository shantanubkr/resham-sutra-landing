import type { BuyerProductType } from "@/lib/types";
import { BUYER_PRODUCT_META } from "@/lib/buyers/products";
import {
  paletteForProduct,
  productGroupLabel,
} from "@/lib/buyers/product-images";

function YarnArt({ accent, light }: { accent: string; light: string }) {
  return (
    <>
      <ellipse cx="200" cy="155" rx="95" ry="95" fill={light} opacity="0.5" />
      <circle
        cx="200"
        cy="155"
        r="72"
        fill="none"
        stroke={accent}
        strokeWidth="22"
        strokeLinecap="round"
        strokeDasharray="18 10"
      />
      <circle cx="200" cy="155" r="28" fill={accent} opacity="0.35" />
      <path
        d="M200 83 Q240 120 200 155 Q160 190 200 227"
        fill="none"
        stroke={accent}
        strokeWidth="3"
        opacity="0.45"
      />
    </>
  );
}

function FabricArt({ accent, light }: { accent: string; light: string }) {
  return (
    <>
      <path
        d="M0 300 L0 180 Q100 120 200 160 Q300 200 400 140 L400 300Z"
        fill={accent}
        opacity="0.18"
      />
      <path
        d="M40 260 Q140 180 240 210 Q320 235 380 190"
        fill="none"
        stroke={accent}
        strokeWidth="28"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M60 220 Q160 150 260 175 Q340 195 360 165"
        fill="none"
        stroke={light}
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.8"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1={80 + i * 65}
          y1={300}
          x2={50 + i * 70}
          y2={175 + (i % 2) * 15}
          stroke={accent}
          strokeWidth="1.5"
          opacity="0.2"
        />
      ))}
    </>
  );
}

function CocoonsArt({ accent, light }: { accent: string; light: string }) {
  const spots: [number, number, number][] = [
    [130, 130, 38],
    [200, 115, 42],
    [270, 130, 36],
    [165, 185, 34],
    [235, 190, 40],
    [200, 210, 32],
  ];
  return (
    <>
      {spots.map(([cx, cy, r], i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx={r}
          ry={r * 1.35}
          fill={i % 2 === 0 ? accent : light}
          opacity={0.35 + (i % 3) * 0.12}
        />
      ))}
      {spots.map(([cx, cy, r], i) => (
        <ellipse
          key={`o-${i}`}
          cx={cx - 8}
          cy={cy - 10}
          rx={r * 0.35}
          ry={r * 0.2}
          fill="white"
          opacity="0.25"
        />
      ))}
    </>
  );
}

function FinishedArt({ accent, light }: { accent: string; light: string }) {
  return (
    <>
      <path
        d="M120 220 C120 120 200 90 280 120 C280 200 200 240 120 220Z"
        fill={accent}
        opacity="0.35"
      />
      <path
        d="M145 210 C145 140 200 115 255 135 C255 195 200 220 145 210Z"
        fill={light}
        opacity="0.6"
      />
      <path
        d="M170 200 L230 160"
        stroke={accent}
        strokeWidth="2"
        opacity="0.4"
        strokeDasharray="6 4"
      />
      <rect
        x="155"
        y="175"
        width="90"
        height="12"
        rx="6"
        fill={accent}
        opacity="0.25"
        transform="rotate(-15 200 181)"
      />
    </>
  );
}

export function ProductThumbnail({
  productType,
  className = "",
  compact = false,
}: {
  productType: BuyerProductType;
  className?: string;
  compact?: boolean;
}) {
  const meta = BUYER_PRODUCT_META[productType];
  const palette = paletteForProduct(productType);
  const group = meta.group;

  const Art =
    group === "yarn"
      ? YarnArt
      : group === "fabric"
        ? FabricArt
        : group === "cocoons"
          ? CocoonsArt
          : FinishedArt;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 400 300"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <rect width="400" height="300" fill={palette.bg} />
        <defs>
          <pattern
            id={`weave-${productType}`}
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 12 L12 0"
              stroke={palette.accent}
              strokeWidth="0.8"
              opacity="0.12"
            />
          </pattern>
        </defs>
        <rect width="400" height="300" fill={`url(#weave-${productType})`} />
        <Art accent={palette.accent} light={palette.light} />
      </svg>
      {!compact && (
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          {palette.label !== "Silk" && (
            <span className="rounded-full bg-white/90 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-gray-800 shadow-sm backdrop-blur-sm">
              {palette.label}
            </span>
          )}
          <span className="rounded-full bg-black/70 px-1.5 py-px text-[9px] font-medium text-white backdrop-blur-sm">
            {productGroupLabel(group)}
          </span>
        </div>
      )}
    </div>
  );
}
