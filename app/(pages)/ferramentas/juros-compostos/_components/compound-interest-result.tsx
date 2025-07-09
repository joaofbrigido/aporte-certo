"use client";

import { DollarSign, Percent, PiggyBank } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Pie, PieChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart";
import { TableCell, TableHead, TableRow } from "@/app/components/ui/table";
import { useCompoundInterestResult } from "@/app/context/compound-interest-result-context";
import { CompoundInterestResult as CompoundInterestResultProps } from "@/app/utils/compound-interest-calculation";
import { Separator } from "@/app/components/ui/separator";
import { numberToCurrency } from "@/app/utils/format-numbers";
import { Card, CardContent } from "@/app/components/ui/card";
import { BasicTable } from "@/app/components/shared/basic-table";
import { CustomTooltipLineChart } from "./custom-tooltip-line-chart";

const CompoundInterestResult = () => {
  const { compoundInterestResult } = useCompoundInterestResult();
  const {
    finalTotalValue,
    totalAmountInterest,
    totalAmountInvested,
    valuesPerMonth,
  } = compoundInterestResult as CompoundInterestResultProps;

  if (!valuesPerMonth) {
    return null;
  }

  const pieChartData = [
    {
      valueInvested: "totalInvested",
      amout: totalAmountInvested,
      fill: "#F1B61D",
    },
    {
      valueInvested: "totalInterest",
      amout: totalAmountInterest,
      fill: "#f59e0b",
    },
  ];
  const pieChartConfig = {
    amout: {
      label: "Total R$",
    },
    totalInvested: {
      label: "Total Investido",
      color: "hsl(var(--chart-1))",
    },
    totalInterest: {
      label: "Total em Juros",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const lineChartData = valuesPerMonth.map((item) => ({
    date: String(item.month + 1).padStart(2, "0"),
    totalInvested: item.totalInvested,
    totalInterest: item.totalInterest,
  }));

  const lineChartConfig = {
    totalInvested: {
      label: "Total Investido",
      color: "#F1B61D",
    },
    totalInterest: {
      label: "Total em Juros",
      color: "#f59e0b",
    },
  } satisfies ChartConfig;

  return (
    <div>
      <Card>
        <CardContent className="flex gap-4 justify-between max-lg:flex-col max-lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="bg-primary p-2 rounded-lg">
                <DollarSign className="h-5 w-5 text-primary-foreground" />
              </span>
              <h2 className="text-lg font-medium">Valor Total Final</h2>
            </div>
            <h3 className="text-2xl font-bold ml-[48px] mt-2">
              {numberToCurrency(finalTotalValue)}
            </h3>
          </div>

          <Separator
            orientation="vertical"
            className="h-[76px] max-lg:hidden dark:bg-foreground/10"
          />
          <Separator
            orientation="horizontal"
            className="hidden max-lg:block dark:bg-foreground/10"
          />

          <div>
            <div className="flex items-center gap-3">
              <span className="bg-primary p-2 rounded-lg">
                <PiggyBank className="h-5 w-5 text-primary-foreground" />
              </span>
              <h2 className="text-lg font-medium">Valor Total Investido</h2>
            </div>
            <h3 className="text-2xl font-bold ml-[48px] mt-2">
              {numberToCurrency(totalAmountInvested)}
            </h3>
          </div>

          <Separator
            orientation="vertical"
            className="h-[76px] max-lg:hidden dark:bg-foreground/10"
          />
          <Separator
            orientation="horizontal"
            className="hidden max-lg:block dark:bg-foreground/10"
          />

          <div>
            <div className="flex items-center gap-3">
              <span className="bg-primary p-2 rounded-lg">
                <Percent className="h-5 w-5 text-primary-foreground" />
              </span>
              <h2 className="text-lg font-medium">Valor Total Em Juros</h2>
            </div>
            <h3 className="text-2xl font-bold ml-[48px] mt-2">
              {numberToCurrency(totalAmountInterest)}
            </h3>
          </div>
        </CardContent>
      </Card>

      <section className="mt-5 grid grid-cols-[0.4fr_1fr] gap-5 max-lg:grid-cols-1">
        <Card>
          <CardContent className="p-0">
            <ChartContainer
              config={pieChartConfig}
              className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[300px]"
            >
              <PieChart>
                <ChartTooltip
                  content={<ChartTooltipContent nameKey="amout" hideLabel />}
                />
                <Pie data={pieChartData} dataKey="amout" innerRadius={40} />
              </PieChart>
            </ChartContainer>
            <div className="px-4 text-center space-x-4">
              <span className="text-[12px] before:size-2 before:inline-block before:bg-[#f59e0b] before:mr-1 before:rounded-[2px]">
                Total em Juros
              </span>
              <span className="text-[12px] before:size-2 before:inline-block before:bg-primary before:mr-1 before:rounded-[2px]">
                Total Investido
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <ChartContainer
              config={lineChartConfig}
              className="max-h-[300px] m-auto w-full"
            >
              <AreaChart accessibilityLayer data={lineChartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 2)}
                />
                {/* <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickCount={3}
                /> */}
                <ChartTooltip
                  cursor={false}
                  //  content={<ChartTooltipContent indicator="line" />}
                  content={<CustomTooltipLineChart config={lineChartConfig} />}
                />
                <Area
                  dataKey="totalInvested"
                  type="natural"
                  fill="#F1B61D"
                  fillOpacity={0.4}
                  stroke="#F1B61D"
                  stackId="a"
                />
                <Area
                  dataKey="totalInterest"
                  type="natural"
                  fill="#f59e0b"
                  fillOpacity={0.4}
                  stroke="#f59e0b"
                  stackId="a"
                />
                <ChartLegend
                  content={<ChartLegendContent payload={undefined} />}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <BasicTable
          containerClassName="col-span-full"
          bordered
          header={
            <>
              <TableHead>Meses</TableHead>
              <TableHead>Juros</TableHead>
              <TableHead>Total Investido</TableHead>
              <TableHead>Total Juros</TableHead>
              <TableHead>Acumulado</TableHead>
            </>
          }
        >
          {valuesPerMonth.map((moth) => (
            <TableRow key={`juros-${moth.month}`}>
              <TableCell>{moth.month + 1}</TableCell>
              <TableCell>{numberToCurrency(moth.fees)}</TableCell>
              <TableCell>{numberToCurrency(moth.totalInvested)}</TableCell>
              <TableCell>{numberToCurrency(moth.totalInterest)}</TableCell>
              <TableCell>{numberToCurrency(moth.accumulated)}</TableCell>
            </TableRow>
          ))}
        </BasicTable>
      </section>
    </div>
  );
};

export default CompoundInterestResult;
