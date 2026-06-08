"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/provider";
import { Button } from "@/components/ui/Button";
import { InlineMessage } from "@/components/ui/Alert";
import { ProductThumbnail } from "@/components/buyer/ProductThumbnail";
import { semanticStyles } from "@/lib/ui/semantic";
import type { BuyerCatalogListing } from "@/lib/types";

function fmtQty(n: number) {
  return n.toLocaleString("en-IN", { maximumFractionDigits: 1 });
}

export function ProductListingCard({
  listing,
  interestSent,
  saved,
  onExpressInterest,
  onSave,
}: {
  listing: BuyerCatalogListing;
  interestSent: boolean;
  saved: boolean;
  onExpressInterest: () => void;
  onSave: () => void;
}) {
  const { tr } = useI18n();
  const unit = listing.unit.split("/")[0];
  const location = listing.villageNames[0] ?? listing.clusterName;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:border-gray-300 hover:shadow-md">
      <ProductThumbnail
        productType={listing.productType}
        className="aspect-[5/2] w-full"
      />

      <div className="flex flex-1 flex-col p-3">
        <h3 className="text-sm font-semibold leading-snug text-gray-900">
          {listing.productLabel}
        </h3>
        <Link
          href={`/buyer/clusters/${listing.clusterId}`}
          className={`mt-0.5 text-xs ${semanticStyles.info.link}`}
        >
          {listing.clusterName}
          {location !== listing.clusterName && (
            <span className="text-muted"> · {location}</span>
          )}
        </Link>

        <div className="mt-2 flex items-baseline justify-between gap-2">
          <p>
            <span className="text-base font-bold tabular-nums">
              ₹{listing.pricePerUnit.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-muted"> / {unit}</span>
          </p>
          <p className="text-right text-[11px] text-muted">
            {fmtQty(listing.quantityAvailable)} {unit}
          </p>
        </div>

        <div className="mt-2.5 flex items-center gap-1.5">
          {!interestSent ? (
            <Button
              variant="green"
              className="min-h-8 flex-1 px-2 text-xs"
              onClick={onExpressInterest}
            >
              {tr("expressInterest")}
            </Button>
          ) : (
            <InlineMessage tone="success" className="flex-1 py-1 text-[11px]">
              {tr("interestSentShort")}
            </InlineMessage>
          )}
          {!saved && (
            <button
              type="button"
              onClick={onSave}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-base text-muted transition hover:border-gray-400 hover:text-gray-900"
              aria-label={tr("saveListing")}
            >
              ♡
            </button>
          )}
          {saved && (
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center text-base text-error"
              aria-hidden
            >
              ♥
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
