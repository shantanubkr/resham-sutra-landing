"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-client";
import { BUYER_PRODUCT_GROUPS, productsByGroup } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/provider";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { InlineMessage } from "@/components/ui/Alert";
import type { BuyerProductType } from "@/lib/types";

interface InventoryRow {
  id: string;
  clusterId: string;
  productType: BuyerProductType;
  productLabel: string;
  unit: string;
  quantityAvailable: number;
  pricePerUnit: number;
  isListed: boolean;
  notes: string | null;
  updatedAt: string;
}

const emptyForm = {
  productType: "",
  quantityAvailable: "",
  pricePerUnit: "",
  notes: "",
  isListed: true,
};

export function ClusterInventoryPanel({
  clusterId,
  canManage: canManageProp,
}: {
  clusterId: string;
  canManage?: boolean;
}) {
  const { tr } = useI18n();
  const [items, setItems] = useState<InventoryRow[]>([]);
  const [canManage, setCanManage] = useState(canManageProp ?? false);
  const [form, setForm] = useState(emptyForm);
  const [editingType, setEditingType] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    apiFetch<{ items: InventoryRow[]; canManage?: boolean }>(
      `/api/clusters/${clusterId}/inventory`
    )
      .then((d) => {
        setItems(d.items);
        if (canManageProp === undefined && d.canManage !== undefined) {
          setCanManage(d.canManage);
        }
      })
      .finally(() => setLoading(false));
  }, [clusterId, canManageProp]);

  useEffect(() => {
    if (canManageProp !== undefined) setCanManage(canManageProp);
  }, [canManageProp]);

  useEffect(() => {
    load();
  }, [load]);

  function startEdit(item: InventoryRow) {
    setEditingType(item.productType);
    setForm({
      productType: item.productType,
      quantityAvailable: String(item.quantityAvailable),
      pricePerUnit: String(item.pricePerUnit),
      notes: item.notes ?? "",
      isListed: item.isListed,
    });
    setMessage(null);
  }

  function resetForm() {
    setEditingType(null);
    setForm(emptyForm);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    await apiFetch(`/api/clusters/${clusterId}/inventory`, {
      method: "POST",
      body: JSON.stringify({
        productType: form.productType,
        quantityAvailable: Number(form.quantityAvailable),
        pricePerUnit: Number(form.pricePerUnit),
        notes: form.notes,
        isListed: form.isListed,
      }),
    });
    setMessage(tr("inventorySaved"));
    resetForm();
    load();
  }

  async function remove(itemId: string) {
    await apiFetch(
      `/api/clusters/${clusterId}/inventory?itemId=${itemId}`,
      { method: "DELETE" }
    );
    load();
  }

  async function toggleListed(item: InventoryRow) {
    await apiFetch(`/api/clusters/${clusterId}/inventory`, {
      method: "POST",
      body: JSON.stringify({
        productType: item.productType,
        quantityAvailable: item.quantityAvailable,
        pricePerUnit: item.pricePerUnit,
        notes: item.notes,
        isListed: !item.isListed,
      }),
    });
    load();
  }

  const listedTypes = new Set(items.map((i) => i.productType));

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold">{tr("clusterInventory")}</h2>
      <p className="mt-1 text-sm text-muted">{tr("clusterInventoryDesc")}</p>

      {loading ? (
        <p className="mt-4 text-sm text-muted">{tr("loading")}</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-xs text-muted">
                <th className="pb-2 pr-3">{tr("product")}</th>
                <th className="pb-2 pr-3">{tr("quantityAvailable")}</th>
                <th className="pb-2 pr-3">{tr("pricePerUnit")}</th>
                <th className="pb-2 pr-3">{tr("listed")}</th>
                <th className="pb-2">{tr("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-3 pr-3">
                    <div className="font-medium">{item.productLabel}</div>
                    {item.notes && (
                      <div className="text-xs text-muted">{item.notes}</div>
                    )}
                  </td>
                  <td className="py-3 pr-3">
                    {item.quantityAvailable.toLocaleString("en-IN")}{" "}
                    {item.unit.split("/")[0]}
                  </td>
                  <td className="py-3 pr-3">
                    ₹{item.pricePerUnit.toLocaleString("en-IN")}
                    <span className="text-xs text-muted"> / {item.unit.split("/")[0]}</span>
                  </td>
                  <td className="py-3 pr-3">
                    {canManage ? (
                      <button
                        type="button"
                        onClick={() => toggleListed(item)}
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          item.isListed
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.isListed ? tr("listed") : tr("hidden")}
                      </button>
                    ) : (
                      <span className="text-xs">
                        {item.isListed ? tr("listed") : tr("hidden")}
                      </span>
                    )}
                  </td>
                  <td className="py-3">
                    {canManage && (
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          className="text-xs"
                          onClick={() => startEdit(item)}
                        >
                          {tr("edit")}
                        </Button>
                        <Button
                          variant="secondary"
                          className="text-xs"
                          onClick={() => remove(item.id)}
                        >
                          {tr("remove")}
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-muted">
                    {tr("noInventoryYet")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {canManage && (
      <form onSubmit={save} className="mt-6 space-y-3 border-t border-gray-100 pt-4">
        <h3 className="font-semibold">
          {editingType ? tr("updateListing") : tr("addListing")}
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <Select
            required
            value={form.productType}
            disabled={!!editingType}
            onChange={(e) =>
              setForm((f) => ({ ...f, productType: e.target.value }))
            }
          >
            <option value="">{tr("selectProduct")}</option>
            {BUYER_PRODUCT_GROUPS.map((group) => (
              <optgroup key={group.id} label={group.label}>
                {productsByGroup(group.id)
                  .filter((p) => !listedTypes.has(p.type) || p.type === editingType)
                  .map((p) => (
                    <option key={p.type} value={p.type}>
                      {p.label}
                    </option>
                  ))}
              </optgroup>
            ))}
          </Select>
          <Input
            type="number"
            min={0}
            step="any"
            required
            placeholder={tr("quantityAvailable")}
            value={form.quantityAvailable}
            onChange={(e) =>
              setForm((f) => ({ ...f, quantityAvailable: e.target.value }))
            }
          />
          <Input
            type="number"
            min={0}
            step="any"
            required
            placeholder={tr("pricePerUnitInr")}
            value={form.pricePerUnit}
            onChange={(e) =>
              setForm((f) => ({ ...f, pricePerUnit: e.target.value }))
            }
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isListed}
              onChange={(e) =>
                setForm((f) => ({ ...f, isListed: e.target.checked }))
              }
            />
            {tr("showOnMarketplace")}
          </label>
        </div>
        <Textarea
          placeholder={tr("inventoryNotes")}
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          rows={2}
        />
        <div className="flex gap-2">
          <Button type="submit" variant="purple">
            {editingType ? tr("updateListing") : tr("addListing")}
          </Button>
          {editingType && (
            <Button type="button" variant="secondary" onClick={resetForm}>
              {tr("cancel")}
            </Button>
          )}
        </div>
        {message && (
          <InlineMessage tone="success" className="text-sm">
            {message}
          </InlineMessage>
        )}
      </form>
      )}
    </div>
  );
}
