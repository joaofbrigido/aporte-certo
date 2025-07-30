"use client";

import {
  deleteCeilingPriceAction,
  upsertCeilingPriceAction,
} from "@/app/actions/ceiling-price";
import { LabelInput } from "@/app/components/shared/label-input";
import { MainButton } from "@/app/components/shared/main-button";
import { StockSelect } from "@/app/components/shared/stock-select";
import { Card, CardContent } from "@/app/components/ui/card";
import { useForm } from "@/app/hooks/use-form";
import { X } from "lucide-react";
import { useState } from "react";
import { CeilingPriceTable } from "./ceiling-price-table";
import { CeilingPrice } from "@/app/services/ceiling-price/types";
import { toast } from "sonner";

export const CeilingPriceForm = ({
  ceilingPrices,
}: {
  ceilingPrices: CeilingPrice[];
}) => {
  const [editingId, setEditingId] = useState<null | string>(null);
  const [stockInput, setStockInput] = useState("");
  const [dividendYieldInput, setDividendYieldInput] = useState("");
  const [dpaInput, setDpaInput] = useState("");

  function clearForm() {
    setEditingId(null);
    setStockInput("");
    setDividendYieldInput("");
    setDpaInput("");
  }

  function handleEditCeilingPrice(ceilingPrice: CeilingPrice) {
    setEditingId(ceilingPrice.guid);
    setStockInput(
      `${ceilingPrice.stock.name}|${ceilingPrice.stock.price}|${ceilingPrice.stock.logo}`
    );
    setDividendYieldInput(ceilingPrice.dividendYield.toFixed(2).toString());
    setDpaInput(ceilingPrice.dpa.toFixed(2).toString());
  }

  async function handleDeleteCeilingPrice(guid: string) {
    const response = await deleteCeilingPriceAction(guid);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    toast.success("Ativo deletado com sucesso!");
  }

  const [{ fieldErrors }, handleSubmit, isPending] = useForm({
    action: upsertCeilingPriceAction,
  });

  return (
    <>
      <Card>
        <CardContent>
          <form
            onSubmit={(e) => {
              clearForm();
              handleSubmit(e, {
                guid: editingId ?? "new",
              });
            }}
            className="grid grid-cols-3 gap-5 max-md:grid-cols-1"
          >
            <StockSelect
              label="Ativo"
              placeholder="Selecione um ativo"
              name="stock"
              value={stockInput}
              onValueChange={setStockInput}
              required
              errors={fieldErrors?.stock}
            />
            <LabelInput
              label="Dividend yield esperado"
              placeholder="% 0,00"
              name="dividendYield"
              isNumber
              value={dividendYieldInput}
              onChange={(e) => setDividendYieldInput(e.target.value)}
              required
              errors={fieldErrors?.dividendYield}
            />
            <LabelInput
              label="DPA/ano"
              placeholder="0,00"
              name="dpa"
              isCurrency
              value={dpaInput}
              onChange={(e) => setDpaInput(e.target.value)}
              required
              errors={fieldErrors?.dpa}
            />

            <div className="mt-3 col-span-full flex gap-3 justify-end">
              {editingId && (
                <MainButton
                  type="button"
                  variant={"secondary"}
                  onClick={clearForm}
                >
                  <X />
                  Cancelar
                </MainButton>
              )}
              <MainButton isAddBtn isLoading={isPending}>
                {editingId ? "Atualizar" : "Adicionar"}
              </MainButton>
            </div>
          </form>
        </CardContent>
      </Card>

      <CeilingPriceTable
        ceilingPrices={ceilingPrices}
        onEdit={handleEditCeilingPrice}
        onDelete={handleDeleteCeilingPrice}
      />
    </>
  );
};
