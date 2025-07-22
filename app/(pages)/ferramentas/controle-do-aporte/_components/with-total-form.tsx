"use client";

import { BasicTable } from "@/app/components/shared/basic-table";
import { LabelInput } from "@/app/components/shared/label-input";
import { MainButton } from "@/app/components/shared/main-button";
import { StockSelect } from "@/app/components/shared/stock-select";
import { TableActionButtons } from "@/app/components/shared/table-action-buttons";
import { TableCell, TableHead, TableRow } from "@/app/components/ui/table";
import { z } from "zod";
import { useState } from "react";
import { cn } from "@/app/lib/utils";
import { numberToCurrency } from "@/app/utils/format-numbers";
import Image from "next/image";
import { Progress } from "@/app/components/ui/progress";
import { X } from "lucide-react";

type Investiment = {
  id: string;
  stock: string;
  logo: string;
  stockPrice: number;
  percentage: number;
  stocksAmount: number;
  total: number;
};

type FieldErrors = {
  totalInvestment?: string[] | undefined;
  stock?: string[] | undefined;
  percentage?: string[] | undefined;
};

const investimentFormSchema = z.object({
  totalInvestment: z
    .string()
    .min(1, "Informe o valor total")
    .transform((val) => Number(val.replace(/\D/g, "")) / 100), // remove tudo que não for dígito e divide por 100 (para lidar com centavos)
  stock: z.string().min(1, "Selecione um ativo"),
  percentage: z
    .string()
    .min(1, "Informe uma porcentagem")
    .transform((val) => Number(val)),
});

export const WithTotalForm = () => {
  const [investiments, setInvestiments] = useState<Investiment[]>([]);
  const [fieldErros, FieldErros] = useState<FieldErrors>();
  const [percentagemTotal, setPercentagemTotal] = useState(0);
  const [stockInput, setStockInput] = useState("");
  const [percentageInput, setPercentageInput] = useState("");
  const [investimentTotal, setInvestimentTotal] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);

  function calculateStockAmount(
    totalInvestment: number,
    percentage: number,
    sotckPrice: number
  ) {
    return Math.ceil((totalInvestment * (percentage / 100)) / sotckPrice);
  }

  function handleClearFields() {
    setEditingId(null);
    setStockInput("");
    setPercentageInput("");
  }

  function handleUpsertInvestiment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const rawData = {
      totalInvestment: formData.get("totalInvestment")?.toString() || "",
      stock: formData.get("stock")?.toString() || "",
      percentage: formData.get("percentage")?.toString() || "",
    };

    const result = investimentFormSchema.safeParse(rawData);
    if (!result.success) {
      FieldErros(result.error.flatten().fieldErrors);
      return;
    }

    FieldErros(undefined);

    const [stockName, stockPrice, stockLogo] = result.data.stock.split("|");

    const stockAmount = calculateStockAmount(
      result.data.totalInvestment,
      result.data.percentage,
      Number(stockPrice)
    );

    const newInvestiment: Investiment = {
      id: editingId ?? crypto.randomUUID(),
      stock: stockName,
      logo: stockLogo,
      stockPrice: Number(stockPrice),
      percentage: result.data.percentage,
      stocksAmount: stockAmount,
      total: stockAmount * Number(stockPrice),
    };

    if (editingId) {
      const prevInvestment = investiments.find((inv) => inv.id === editingId);
      if (!prevInvestment) return;

      setInvestiments((prev) =>
        prev.map((inv) => (inv.id === editingId ? newInvestiment : inv))
      );

      setPercentagemTotal(
        (prev) => prev - prevInvestment.percentage + result.data.percentage
      );
      setInvestimentTotal(
        (prev) => prev - prevInvestment.total + newInvestiment.total
      );
    } else {
      setInvestiments((prev) => [...prev, newInvestiment]);
      setPercentagemTotal((prev) =>
        prev + result.data.percentage > 100
          ? 100
          : prev + result.data.percentage
      );
      setInvestimentTotal((prev) => prev + stockAmount * Number(stockPrice));
    }

    handleClearFields();
  }

  function handleDeleteInvestiment(id: string) {
    setInvestiments((prev) => prev.filter((inv) => inv.id !== id));
    setPercentagemTotal(
      (prev) => prev - investiments.find((inv) => inv.id === id)!.percentage
    );
    setInvestimentTotal(
      (prev) => prev - investiments.find((inv) => inv.id === id)!.total
    );
  }

  return (
    <>
      <div className="w-full flex items-center justify-center gap-3 mb-4">
        <Progress value={percentagemTotal} className="max-w-xs" />
        <span className="text-sm">{percentagemTotal}%</span>
      </div>

      <form className="space-y-5" onSubmit={handleUpsertInvestiment}>
        <LabelInput
          label="Total"
          name="totalInvestment"
          isCurrency
          required
          errors={fieldErros?.totalInvestment}
        />
        <div className="flex items-end gap-5 max-sm:flex-col max-sm:items-start">
          <div className="w-full grid grid-cols-2 gap-5 max-sm:grid-cols-1 ">
            <StockSelect
              label="Ativo"
              placeholder="Selecione um ativo"
              name="stock"
              required
              errors={fieldErros?.stock}
              value={stockInput}
              onValueChange={setStockInput}
            />
            <LabelInput
              label="Porcentagem"
              name="percentage"
              type="number"
              required
              value={percentageInput}
              onChange={(e) => setPercentageInput(e.target.value)}
              max={
                editingId
                  ? 100 -
                    percentagemTotal +
                    investiments.find((inv) => inv.id === editingId)!.percentage
                  : 100 - percentagemTotal
              }
              errors={fieldErros?.percentage}
            />
          </div>
          <div
            className={cn(
              "flex gap-3 max-sm:self-center",
              fieldErros && "self-center"
            )}
          >
            <MainButton
              isAddBtn
              disabled={!editingId && percentagemTotal >= 100}
            >
              {editingId ? "Atualizar" : "Adicionar"}
            </MainButton>
            {editingId && (
              <MainButton variant={"secondary"} onClick={handleClearFields}>
                <X />
                Cancelar
              </MainButton>
            )}
          </div>
        </div>
      </form>

      <BasicTable
        containerClassName="mt-5"
        bordered
        header={
          <>
            <TableHead>Ativo</TableHead>
            <TableHead>Preço Unitário</TableHead>
            <TableHead>Qtd Cotas</TableHead>
            <TableHead>Porcentagem</TableHead>
            <TableHead>Preço Total</TableHead>
            <TableHead></TableHead>
          </>
        }
        footer={
          investiments.length > 0 && (
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="">
                {numberToCurrency(investimentTotal)}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          )
        }
      >
        {investiments && investiments.length > 0 ? (
          investiments.map((investment) => (
            <TableRow key={`investiments-${investment.id}`}>
              <TableCell className="flex items-center gap-2 min-w-[130px]">
                <Image
                  src={investment.logo}
                  alt={investment.stock}
                  width={32}
                  height={32}
                  className="rounded-md"
                />
                {investment.stock}
              </TableCell>
              <TableCell>{numberToCurrency(investment.stockPrice)}</TableCell>
              <TableCell>{investment.stocksAmount}</TableCell>
              <TableCell>{investment.percentage}%</TableCell>
              <TableCell>{numberToCurrency(investment.total)}</TableCell>
              <TableCell>
                <TableActionButtons
                  onEdit={() => {
                    setEditingId(investment.id);
                    setStockInput(
                      `${investment.stock}|${investment.stockPrice}|${investment.logo}`
                    );
                    setPercentageInput(investment.percentage.toString());
                  }}
                  onDelete={() => {
                    handleDeleteInvestiment(investment.id);
                  }}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center text-muted-foreground"
            >
              Nenhum Ativo Adicionado
            </TableCell>
          </TableRow>
        )}
      </BasicTable>
    </>
  );
};
