"use client";

import {
  deleteInvestmentControlWithoutTotalAction,
  upsertInvestmentControlWithoutTotalAction,
} from "@/app/actions/investiment-control";
import { BasicTable } from "@/app/components/shared/basic-table";
import { LabelInput } from "@/app/components/shared/label-input";
import { MainButton } from "@/app/components/shared/main-button";
import { StockSelect } from "@/app/components/shared/stock-select";
import { TableActionButtons } from "@/app/components/shared/table-action-buttons";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart";
import { TableCell, TableHead, TableRow } from "@/app/components/ui/table";
import { useForm } from "@/app/hooks/use-form";
import { InvestmentControlWithoutTotal } from "@/app/services/investiment-control/types";
import { numberToCurrency } from "@/app/utils/format-numbers";
import { DollarSign, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Pie, PieChart } from "recharts";
import { toast } from "sonner";

export const WithoutTotalForm = ({
  investments,
}: {
  investments: InvestmentControlWithoutTotal[];
}) => {
  const [stockInput, setStockInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [totalInput, setTotalInput] = useState(0);
  const [editingGuid, setEditingGuid] = useState<string | null>(null);
  const totalInvestment = investments.reduce((acc, inv) => acc + inv.total, 0);

  function handleChangeQuantity(e: React.ChangeEvent<HTMLInputElement>) {
    if (stockInput) {
      const value = e.target.value.replace(/\D/g, "");
      const [, stockPrice] = stockInput.split("|");
      setQuantityInput(value);
      setTotalInput(Number(value) * Number(stockPrice));
    }
  }

  function clearForm() {
    setEditingGuid(null);
    setStockInput("");
    setQuantityInput("");
    setTotalInput(0);
  }

  const chartConfig = {
    percentage: {
      label: "Porcentagem",
    },
    chrome: {
      label: "Ativo 1",
      color: "var(--chart-1)",
    },
    safari: {
      label: "Ativo 2",
      color: "var(--chart-2)",
    },
    firefox: {
      label: "Ativo 3",
      color: "var(--chart-3)",
    },
    edge: {
      label: "Ativo 4",
      color: "var(--chart-4)",
    },
    other: {
      label: "Ativo 5",
      color: "var(--chart-5)",
    },
  } satisfies ChartConfig;

  function getChartData() {
    const fillColors = [
      "var(--color-chrome)",
      "var(--color-safari)",
      "var(--color-firefox)",
      "var(--color-edge)",
      "var(--color-other)",
    ];

    let colorIndex = 0;

    return investments.map((item) => {
      const fill = fillColors[colorIndex];
      colorIndex = (colorIndex + 1) % fillColors.length;

      return {
        stock: item.stock.name,
        percentage: Number(((item.total / totalInvestment) * 100).toFixed(2)),
        fill,
      };
    });
  }

  async function handleDelete(guid: string) {
    clearForm();
    const result = await deleteInvestmentControlWithoutTotalAction(guid);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
  }

  const [{ fieldErrors }, handleSubmit, isPending] = useForm({
    action: upsertInvestmentControlWithoutTotalAction,
  });

  return (
    <>
      <Card>
        <CardContent>
          <form
            onSubmit={(e) => {
              handleSubmit(e, { guid: editingGuid ?? "new" }).then(() =>
                clearForm()
              );
            }}
          >
            <div className="grid grid-cols-3 gap-5 max-sm:grid-cols-1">
              <StockSelect
                label="Ativo"
                placeholder="Selecione um ativo"
                name="stock"
                value={stockInput}
                onValueChange={setStockInput}
                errors={fieldErrors?.stock}
                required
              />
              <LabelInput
                label="Quantidade"
                name="quantity"
                type="number"
                value={quantityInput}
                onChange={handleChangeQuantity}
                required
                errors={fieldErrors?.quantity}
              />
              <LabelInput
                label="Total"
                name="total"
                value={numberToCurrency(totalInput)}
                readOnly
              />
            </div>
            <div className="flex gap-3 mt-5 justify-center">
              {editingGuid && (
                <MainButton variant={"secondary"} onClick={clearForm}>
                  <X />
                  Cancelar
                </MainButton>
              )}
              <MainButton isAddBtn isLoading={isPending}>
                {editingGuid ? "Atualizar" : "Adicionar"}
              </MainButton>
            </div>
          </form>
        </CardContent>
      </Card>

      <section className="grid gap-5 grid-cols-[1fr_0.5fr] max-lg:grid-cols-1">
        <BasicTable
          bordered
          header={
            <>
              <TableHead>Ativo</TableHead>
              <TableHead>Preço Unitário</TableHead>
              <TableHead>Qtd Cotas</TableHead>
              <TableHead>Preço Total</TableHead>
              <TableHead></TableHead>
            </>
          }
          footer={
            investments.length > 0 && (
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell>{numberToCurrency(totalInvestment)}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            )
          }
        >
          {investments && investments.length > 0 ? (
            investments.map((investment) => (
              <TableRow key={`investmentsWithoutTotal-${investment.guid}`}>
                <TableCell className="flex items-center gap-2 min-w-[130px]">
                  <Image
                    src={investment.stock.logo}
                    alt={investment.stock.name}
                    width={32}
                    height={32}
                    className="rounded-md"
                  />
                  {investment.stock.name}
                </TableCell>
                <TableCell>
                  {numberToCurrency(investment.stock.price)}
                </TableCell>
                <TableCell>{investment.stockAmount}</TableCell>
                <TableCell>{numberToCurrency(investment.total)}</TableCell>
                <TableCell>
                  <TableActionButtons
                    onEdit={() => {
                      setEditingGuid(investment.guid);
                      setStockInput(
                        `${investment.stock.name}|${investment.stock.price}|${investment.stock.logo}`
                      );
                      setQuantityInput(investment.stockAmount.toString());
                      setTotalInput(investment.total);
                    }}
                    onDelete={async () => await handleDelete(investment.guid)}
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

        <div className="space-y-5">
          <Card>
            <CardContent>
              <div className="flex gap-3 items-center justify-between mb-8">
                <h2>Total do Aporte</h2>
                <DollarSign className="text-primary size-5" />
              </div>
              <h3 className="text-4xl font-bold">
                {numberToCurrency(totalInvestment)}
              </h3>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[400px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
              >
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={getChartData()}
                    dataKey="percentage"
                    label
                    nameKey="stock"
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};
