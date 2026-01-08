import { Card, CardContent } from "@/app/components/ui/card";
import { MyWalletTable } from "./my-wallet-table";
import { DollarSign } from "lucide-react";
import { numberToCurrency } from "@/app/utils/format-numbers";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart";
import { Pie, PieChart } from "recharts";
import { StockWallet } from "@/app/services/my-wallet/types";

type MyWalletResultProps = {
  stocksWallet: StockWallet[];
  onEdit: (stockWallet: StockWallet) => void;
  onDelete: (guid: string) => void;
};

export const MyWalletResult = ({
  stocksWallet,
  onEdit,
  onDelete,
}: MyWalletResultProps) => {
  const totalInvestment = stocksWallet.reduce(
    (acc, stock) => acc + stock.totalPrice,
    0
  );

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

    return stocksWallet.map((item) => {
      const fill = fillColors[colorIndex];
      colorIndex = (colorIndex + 1) % fillColors.length;

      return {
        stock: item.stock.name,
        percentage: Number(
          ((item.totalPrice / totalInvestment) * 100).toFixed(2)
        ),
        fill,
      };
    });
  }

  return (
    <section className="grid gap-5 grid-cols-[1fr_0.4fr] max-lg:grid-cols-1">
      <MyWalletTable
        stocksWallet={stocksWallet}
        onEdit={onEdit}
        onDelete={onDelete}
        totalInvestment={numberToCurrency(totalInvestment)}
      />

      <div className="space-y-5">
        <Card>
          <CardContent>
            <div className="flex gap-3 items-center justify-between mb-8">
              <h2 className="font-medium">Total Investido</h2>
              <DollarSign className="text-primary size-5" />
            </div>
            <h3 className="text-4xl font-bold">
              {numberToCurrency(totalInvestment)}
            </h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="font-medium mb-1">Distribuição de Ativos</h2>

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
  );
};
