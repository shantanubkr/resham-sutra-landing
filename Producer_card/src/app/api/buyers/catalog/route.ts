import { NextRequest } from "next/server";
import { buildMarketplaceCatalog, filterAndSortListings } from "@/lib/buyers/inventory";
import { readDatabase } from "@/lib/store";
import { errorResponse, jsonResponse, requireRole } from "@/lib/auth/guards";
import type { BuyerProductType } from "@/lib/types";
import type { CatalogSort } from "@/lib/buyers/inventory";

export async function GET(request: NextRequest) {
  try {
    await requireRole(request, ["buyer"]);
    const db = await readDatabase();
    const { searchParams } = new URL(request.url);
    const clusterId = searchParams.get("clusterId");
    const productType = searchParams.get("productType") as BuyerProductType | null;
    const productGroup = searchParams.get("productGroup");
    const search = searchParams.get("search") ?? "";
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sort = searchParams.get("sort") as CatalogSort | null;

    const catalog = buildMarketplaceCatalog(db);

    const listings = filterAndSortListings(catalog.listings, {
      clusterId,
      productType,
      productGroup,
      search,
      minPrice: minPrice ? Number(minPrice) : null,
      maxPrice: maxPrice ? Number(maxPrice) : null,
      sort,
    });

    let clusters = catalog.clusters;
    if (clusterId) {
      clusters = clusters.filter((c) => c.id === clusterId);
    } else if (search || productType || productGroup || minPrice || maxPrice) {
      const clusterIds = new Set(listings.map((l) => l.clusterId));
      clusters = clusters.filter((c) => clusterIds.has(c.id));
    }

    return jsonResponse({ clusters, listings });
  } catch (e) {
    return errorResponse(e);
  }
}
