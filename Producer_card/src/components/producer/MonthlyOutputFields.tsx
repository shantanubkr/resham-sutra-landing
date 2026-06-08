"use client";

import { Input } from "@/components/ui/Input";
import {
  BUYER_PRODUCT_META,
  productsForSilkType,
} from "@/lib/buyers/products";
import { useI18n } from "@/lib/i18n/provider";
import type { BuyerProductType, ProducerMonthlyOutput, SilkVariety } from "@/lib/types";

export function MonthlyOutputFields({
  value,
  onChange,
  primaryCategory,
  silkType = "eri",
  readOnly = false,
}: {
  value: ProducerMonthlyOutput;
  onChange: (value: ProducerMonthlyOutput) => void;
  primaryCategory?: string;
  silkType?: SilkVariety;
  readOnly?: boolean;
}) {
  const { tr } = useI18n();
  const productTypes = productsForSilkType(
    silkType,
    primaryCategory ?? "weaver"
  );
  const products = value.products ?? {};

  function setProduct(productType: BuyerProductType, raw: string) {
    const num = raw === "" ? 0 : Math.max(0, Number(raw));
    const nextProducts = { ...products, [productType]: num };
    if (num === 0) delete nextProducts[productType];

    let silkWovenMeters = 0;
    let produceKg = 0;
    let cocoonsKg = 0;
    for (const [t, v] of Object.entries(nextProducts)) {
      const meta = BUYER_PRODUCT_META[t as BuyerProductType];
      if (!meta || !v) continue;
      if (meta.group === "fabric") silkWovenMeters += v;
      else if (meta.group === "cocoons") cocoonsKg += v;
      else produceKg += v;
    }

    onChange({
      silkWovenMeters,
      produceKg,
      cocoonsKg,
      products: nextProducts,
    });
  }

  return (
    <div className="space-y-4">
      <p className="text-center text-base font-medium text-muted">
        {tr("monthlyOutputHint")}
      </p>
      <div className="grid gap-4">
        {productTypes.map((productType) => {
          const meta = BUYER_PRODUCT_META[productType];
          const amount = products[productType] ?? 0;
          return (
            <div
              key={productType}
              className="rounded-2xl border-2 border-gray-200 bg-white p-4"
            >
              <p className="text-base font-bold">{meta.label}</p>
              <Input
                type="number"
                min={0}
                step="0.1"
                className="text-2xl py-4 mt-2 text-center font-bold"
                disabled={readOnly}
                value={amount || ""}
                onChange={(e) => setProduct(productType, e.target.value)}
                inputMode="decimal"
              />
              <p className="mt-1 text-center text-sm text-muted">{meta.unit}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
