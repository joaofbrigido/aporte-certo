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
  onEdit,
  onDelete,
}: {
  ceilingPrices: CeilingPrice[];
  onEdit: (ceilingPrice: CeilingPrice) => void;
  onDelete: (guid: string) => void;
}) => {
  return (
    <BasicTable
      containerClassName="mt-5"
      bordered
      data={ceilingPrices ?? []}
      header={() => (
        <>
          <TableHead>Ativo</TableHead>
          <TableHead>D. Yield Esperado</TableHead>
          <TableHead>DPA</TableHead>
          <TableHead>Preço Atual</TableHead>
          <TableHead>Preço Teto</TableHead>
          <TableHead>Margin Segurança</TableHead>
          <TableHead />
        </>
      )}
      renderRow={(cp) => (
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

          <TableCell>{cp.dividendYield}%</TableCell>

          <TableCell>{numberToCurrency(cp.dpa)}</TableCell>

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
            <TableActionButtons
              onEdit={() => {
                onEdit(cp);
              }}
              onDelete={() => onDelete(cp.guid)}
            />
          </TableCell>
        </TableRow>
      )}
    />
  );
};
