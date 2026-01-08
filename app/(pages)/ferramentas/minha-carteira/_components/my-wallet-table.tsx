"use client";

import { BasicTable } from "@/app/components/shared/basic-table";
import { TableActionButtons } from "@/app/components/shared/table-action-buttons";
import { TableCell, TableHead, TableRow } from "@/app/components/ui/table";
import { cn } from "@/app/lib/utils";
import { StockWallet } from "@/app/services/my-wallet/types";
import { numberToCurrency, numberToPercent } from "@/app/utils/format-numbers";
import Image from "next/image";

export const MyWalletTable = ({
  stocksWallet,
  totalInvestment,
  onEdit,
  onDelete,
}: {
  stocksWallet: StockWallet[];
  totalInvestment: string;
  onEdit: (stockWallet: StockWallet) => void;
  onDelete: (guid: string) => void;
}) => {
  return (
    <BasicTable
      data={stocksWallet}
      sortConfig={{
        lucro: {
          key: "lucro",
          getValue: (sw) => sw.variationPrice,
        },
        total: {
          key: "total",
          getValue: (sw) => sw.totalPrice,
        },
      }}
      header={({ onSort, activeSort }) => (
        <>
          <TableHead>Ativo</TableHead>
          <TableHead>Preço Médio</TableHead>
          <TableHead>Preço Atual</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>(%) Lucro</TableHead>

          <TableHead onClick={() => onSort("lucro")} className="cursor-pointer">
            (R$) Lucro
            {activeSort?.key === "lucro" &&
              (activeSort.direction === "asc" ? " ↑" : " ↓")}
          </TableHead>

          <TableHead>(%) Total</TableHead>

          <TableHead onClick={() => onSort("total")} className="cursor-pointer">
            (R$) Total
            {activeSort?.key === "total" &&
              (activeSort.direction === "asc" ? " ↑" : " ↓")}
          </TableHead>

          <TableHead />
        </>
      )}
      renderRow={(sw) => (
        <TableRow key={sw.guid}>
          <TableCell className="flex items-center gap-2 min-w-[130px]">
            <Image
              src={sw.stock.logo}
              alt={sw.stock.name}
              width={32}
              height={32}
              className="rounded-md"
            />
            {sw.stock.name}
          </TableCell>
          <TableCell>{numberToCurrency(sw.averagePrice)}</TableCell>
          <TableCell>{numberToCurrency(sw.stock.price)}</TableCell>
          <TableCell>{sw.quantity}</TableCell>
          <TableCell
            className={cn(
              sw.variationPercentage >= 0 ? "text-green-600" : "text-red-600"
            )}
          >
            {numberToPercent(sw.variationPercentage)}
          </TableCell>
          <TableCell
            className={cn(
              sw.variationPrice >= 0 ? "text-green-600" : "text-red-600"
            )}
          >
            {numberToCurrency(sw.variationPrice)}
          </TableCell>
          <TableCell>{numberToPercent(sw.totalPercentage)}</TableCell>
          <TableCell>{numberToCurrency(sw.totalPrice)}</TableCell>
          <TableCell>
            <TableActionButtons
              onEdit={() => {
                onEdit(sw);
              }}
              onDelete={() => onDelete(sw.guid)}
            />
          </TableCell>
        </TableRow>
      )}
      footer={
        stocksWallet.length > 0 && (
          <TableRow>
            <TableCell colSpan={7}>Total</TableCell>
            <TableCell>{totalInvestment}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        )
      }
    />
  );
};
