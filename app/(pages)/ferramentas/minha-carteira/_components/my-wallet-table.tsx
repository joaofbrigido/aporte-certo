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
  onEdit,
  onDelete,
}: {
  stocksWallet: StockWallet[];
  onEdit: (stockWallet: StockWallet) => void;
  onDelete: (guid: string) => void;
}) => {
  return (
    <BasicTable
      containerClassName="mt-5"
      bordered
      header={
        <>
          <TableHead>Ativo</TableHead>
          <TableHead>Preço Médio</TableHead>
          <TableHead>Preço Atual</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>(%) Lucro</TableHead>
          <TableHead>(R$) Lucro</TableHead>
          <TableHead>(%) Total</TableHead>
          <TableHead>(R$) Total</TableHead>
          <TableHead></TableHead>
        </>
      }
      footer={
        stocksWallet.length > 0 && (
          <TableRow>
            <TableCell colSpan={7}>Total</TableCell>
            <TableCell>
              {numberToCurrency(
                stocksWallet.reduce((acc, stock) => acc + stock.totalPrice, 0)
              )}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        )
      }
    >
      {stocksWallet && stocksWallet.length > 0 ? (
        stocksWallet.map((sw) => (
          <TableRow key={`my-wallet-${sw.guid}`}>
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
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={9} className="text-center text-muted-foreground">
            Nenhum Ativo Adicionado
          </TableCell>
        </TableRow>
      )}
    </BasicTable>
  );
};
