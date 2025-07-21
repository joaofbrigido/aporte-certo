"use client";

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
import { numberToCurrency } from "@/app/utils/format-numbers";
import { DollarSign } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Pie, PieChart } from "recharts";
import z from "zod";

type Investiment = {
  id: string;
  stock: string;
  logo: string;
  stockPrice: number;
  stocksAmount: number;
  total: number;
};

const investimentFormSchema = z.object({
  stock: z.string().min(1, "Selecione um ativo"),
  quantity: z
    .string()
    .min(1, "Informe a quantidade de cotas")
    .transform((val) => Number(val)),
  total: z
    .string()
    .min(1, "Informe o valor total")
    .transform((val) => Number(val.replace(/\D/g, "")) / 100), // remove tudo que não for dígito e divide por 100 (para lidar com centavos)
});

type FieldErrors = {
  stock?: string[] | undefined;
  quantity?: string[] | undefined;
};

export const WithoutTotalForm = () => {
  const [investiments, setInvestiments] = useState<Investiment[]>([]);
  const [fieldErros, FieldErros] = useState<FieldErrors>();
  const [investimentTotal, setInvestimentTotal] = useState(0);
  const [stockInput, setStockInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [totalInput, setTotalInput] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleChangeQuantity(e: React.ChangeEvent<HTMLInputElement>) {
    if (stockInput) {
      const value = e.target.value.replace(/\D/g, "");
      const [, stockPrice] = stockInput.split("|");
      setQuantityInput(value);
      setTotalInput(Number(value) * Number(stockPrice));
    }
  }

  function handleUpsertInvestiment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const rawData = {
      stock: formData.get("stock")?.toString() || "",
      quantity: formData.get("quantity")?.toString() || "",
      total: formData.get("total")?.toString() || "",
    };

    const result = investimentFormSchema.safeParse(rawData);
    if (!result.success) {
      FieldErros(result.error.flatten().fieldErrors);
      return;
    }

    FieldErros(undefined);

    const [stockName, stockPrice, stockLogo] = result.data.stock.split("|");

    const newInvestiment: Investiment = {
      id: editingId ?? crypto.randomUUID(),
      stock: stockName,
      logo: stockLogo,
      stockPrice: Number(stockPrice),
      stocksAmount: Number(result.data.quantity),
      total: Number(result.data.total),
    };

    if (editingId) {
      const prevInvestment = investiments.find((inv) => inv.id === editingId);
      if (!prevInvestment) return;

      setInvestiments((prev) =>
        prev.map((inv) => (inv.id === editingId ? newInvestiment : inv))
      );

      setInvestimentTotal(
        (prev) => prev - prevInvestment.total + newInvestiment.total
      );
    } else {
      setInvestiments((prev) => [...prev, newInvestiment]);
      setInvestimentTotal((prev) => prev + Number(result.data.total));
    }

    setEditingId(null);
    setStockInput("");
    setQuantityInput("");
    setTotalInput(0);
  }

  function handleDeleteInvestiment(id: string) {
    setInvestiments((prev) => prev.filter((inv) => inv.id !== id));
    setInvestimentTotal(
      (prev) => prev - investiments.find((inv) => inv.id === id)!.total || 0
    );
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

    const totalSum = investiments.reduce((acc, item) => acc + item.total, 0);

    let colorIndex = 0;

    return investiments.map((item) => {
      const fill = fillColors[colorIndex];
      colorIndex = (colorIndex + 1) % fillColors.length;

      return {
        stock: item.stock,
        percentage: Number(((item.total / totalSum) * 100).toFixed(2)),
        fill,
      };
    });
  }

  return (
    <>
      <Card>
        <CardContent>
          <form onSubmit={handleUpsertInvestiment}>
            <div className="grid grid-cols-3 gap-5 max-sm:grid-cols-1">
              <StockSelect
                label="Ativo"
                placeholder="Selecione um ativo"
                name="stock"
                value={stockInput}
                onValueChange={setStockInput}
                errors={fieldErros?.stock}
                required
              />
              <LabelInput
                label="Quantidade"
                name="quantity"
                type="number"
                value={quantityInput}
                onChange={handleChangeQuantity}
                required
                errors={fieldErros?.quantity}
              />
              <LabelInput
                label="Total"
                name="total"
                value={numberToCurrency(totalInput)}
                readOnly
              />
            </div>
            <MainButton isAddBtn className="max-sm:w-full mt-5 mx-auto flex">
              {editingId ? "Atualizar" : "Adicionar"}
            </MainButton>
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
            investiments.length > 0 && (
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell>{numberToCurrency(investimentTotal)}</TableCell>
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
                <TableCell>{numberToCurrency(investment.total)}</TableCell>
                <TableCell>
                  <TableActionButtons
                    onEdit={() => {
                      setEditingId(investment.id);
                      setStockInput(
                        `${investment.stock}|${investment.stockPrice}|${investment.logo}`
                      );
                      setQuantityInput(investment.stocksAmount.toString());
                      setTotalInput(investment.total);
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

        <div className="space-y-5">
          <Card>
            <CardContent>
              <div className="flex gap-3 items-center justify-between mb-8">
                <h2>Total do Aporte</h2>
                <DollarSign className="text-primary size-5" />
              </div>
              <h3 className="text-4xl font-bold">
                {numberToCurrency(investimentTotal)}
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
