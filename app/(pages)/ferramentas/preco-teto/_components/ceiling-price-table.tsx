"use client";

import { BasicTable } from "@/app/components/shared/basic-table";
import { TableActionButtons } from "@/app/components/shared/table-action-buttons";
import { TableCell, TableHead, TableRow } from "@/app/components/ui/table";
import { cn } from "@/app/lib/utils";
import { CeilingPrice } from "@/app/services/ceiling-price/types";
import { numberToCurrency, numberToPercent } from "@/app/utils/format-numbers";
import Image from "next/image";
import React from "react";

export const CeilingPriceTable = ({
  ceilingPrices,
}: {
  ceilingPrices: CeilingPrice[];
}) => {
  return (
    <BasicTable
      containerClassName="mt-5"
      bordered
      header={
        <>
          <TableHead>Ativo</TableHead>
          <TableHead>DPA</TableHead>
          <TableHead>D. Yield</TableHead>
          <TableHead>Preço Atual</TableHead>
          <TableHead>Preço Teto</TableHead>
          <TableHead>Margin Segurança</TableHead>
          <TableHead></TableHead>
        </>
      }
    >
      {ceilingPrices && ceilingPrices.length > 0 ? (
        ceilingPrices.map((cp) => (
          <TableRow key={`investiments-${cp.guid}`}>
            <TableCell className="flex items-center gap-2 min-w-[130px]">
              <Image
                src={cp.stock.logo}
                alt={cp.stock.name}
                width={32}
                height={32}
                className="rounded-md"
              />
              {cp.stock.name}
            </TableCell>
            <TableCell>{numberToCurrency(cp.dpa)}</TableCell>
            <TableCell>{cp.dividendYield}%</TableCell>
            <TableCell>{numberToCurrency(cp.stock.price)}</TableCell>
            <TableCell>{numberToCurrency(cp.ceilingPrice)}</TableCell>
            <TableCell
              className={cn(
                cp.safetyMargin > 0 ? "text-green-600" : "text-red-600"
              )}
            >
              {numberToPercent(cp.safetyMargin)}
            </TableCell>
            <TableCell>
              <TableActionButtons onEdit={() => {}} onDelete={() => {}} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={6} className="text-center text-muted-foreground">
            Nenhum Ativo Adicionado
          </TableCell>
        </TableRow>
      )}
    </BasicTable>
  );
};
