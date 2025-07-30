"use client";

import { upsertCeilingPriceAction } from "@/app/actions/ceiling-price";
import { LabelInput } from "@/app/components/shared/label-input";
import { MainButton } from "@/app/components/shared/main-button";
import { StockSelect } from "@/app/components/shared/stock-select";
import { Card, CardContent } from "@/app/components/ui/card";
import { useForm } from "@/app/hooks/use-form";
import { X } from "lucide-react";
import { useState } from "react";
import { CeilingPriceTable } from "./ceiling-price-table";
import { CeilingPrice } from "@/app/services/ceiling-price/types";

export const CeilingPriceForm = ({
  ceilingPrices,
}: {
  ceilingPrices: CeilingPrice[];
}) => {
  const [editingId, setEditingId] = useState<null | string>(null);
  const [stockInput, setStockInput] = useState("");

  const [{ fieldErrors }, handleSubmit, isPending] = useForm({
    action: upsertCeilingPriceAction,
  });

  return (
    <>
      <Card>
        <CardContent>
          <form
            onSubmit={(e) => {
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
              required
              value={stockInput}
              onValueChange={setStockInput}
              errors={fieldErrors?.stock}
            />
            <LabelInput
              label="Dividend yield esperado"
              placeholder="% 0,00"
              name="dividendYield"
              isNumber
              required
              errors={fieldErrors?.dividendYield}
            />
            <LabelInput
              label="DPA/ano"
              placeholder="0,00"
              name="dpa"
              isNumber
              required
              errors={fieldErrors?.dpa}
            />

            <div className="mt-3 col-span-full flex gap-3 justify-end">
              {editingId && (
                <MainButton
                  type="button"
                  variant={"secondary"}
                  onClick={() => setEditingId("")}
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

      <CeilingPriceTable ceilingPrices={ceilingPrices} />
    </>
  );
};
