"use client";

import { LabelInput } from "@/app/components/shared/label-input";
import { MainButton } from "@/app/components/shared/main-button";
import { StockSelect } from "@/app/components/shared/stock-select";
import { Card, CardContent } from "@/app/components/ui/card";
import { useForm } from "@/app/hooks/use-form";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { StockWallet } from "@/app/services/my-wallet/types";
import {
  deleteStockWalletAction,
  upsertStockWalletAction,
} from "@/app/actions/my-wallet";
import { MyWalletTable } from "./my-wallet-table";

export const MyWalletForm = ({
  stocksWallet,
}: {
  stocksWallet: StockWallet[];
}) => {
  const [editingId, setEditingId] = useState<null | string>(null);
  const [stockInput, setStockInput] = useState("");
  const [avaregePriceInput, setAvaregePriceInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");

  function clearForm() {
    setEditingId(null);
    setStockInput("");
    setAvaregePriceInput("");
    setQuantityInput("");
  }

  function handleEditStock(stock: StockWallet) {
    setEditingId(stock.guid);
    setStockInput(
      `${stock.stock.name}|${stock.stock.price}|${stock.stock.logo}`
    );
    setAvaregePriceInput(stock.averagePrice.toFixed(2).toString());
    setQuantityInput(stock.quantity.toString());
  }

  async function handleDelete(guid: string) {
    clearForm();
    const response = await deleteStockWalletAction(guid);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    toast.success(response.message);
  }

  const [{ fieldErrors }, handleSubmit, isPending] = useForm({
    action: upsertStockWalletAction,
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
              label="Preço Médio"
              placeholder="0,00"
              name="averagePrice"
              isCurrency
              value={avaregePriceInput}
              onChange={(e) => setAvaregePriceInput(e.target.value)}
              required
              errors={fieldErrors?.dpa}
            />
            <LabelInput
              label="Quantidade"
              placeholder="0"
              name="quantity"
              type="number"
              value={quantityInput}
              onChange={(e) => setQuantityInput(e.target.value)}
              required
              min={1}
              errors={fieldErrors?.quantity}
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

      <MyWalletTable
        stocksWallet={stocksWallet}
        onEdit={handleEditStock}
        onDelete={handleDelete}
      />
    </>
  );
};
