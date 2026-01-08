"use client";

import { BasicTable } from "@/app/components/shared/basic-table";
import { LabelInput } from "@/app/components/shared/label-input";
import { MainButton } from "@/app/components/shared/main-button";
import { StockSelect } from "@/app/components/shared/stock-select";
import { TableActionButtons } from "@/app/components/shared/table-action-buttons";
import { TableCell, TableHead, TableRow } from "@/app/components/ui/table";
import { useState } from "react";
import { cn } from "@/app/lib/utils";
import { numberToCurrency } from "@/app/utils/format-numbers";
import Image from "next/image";
import { Progress } from "@/app/components/ui/progress";
import { FileDown, X } from "lucide-react";
import { useForm } from "@/app/hooks/use-form";
import { InvestmentControlWithTotal } from "@/app/services/investiment-control/types";
import {
  deleteInvestmentControlWithTotalAction,
  upsertInvestmentControlWithTotalAction,
} from "@/app/actions/investiment-control";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const WithTotalForm = ({
  investimentsWithTotal,
}: {
  investimentsWithTotal: InvestmentControlWithTotal;
}) => {
  const [stockInput, setStockInput] = useState("");
  const [percentageInput, setPercentageInput] = useState("");
  const [editingGuid, setEditingGuid] = useState<string | null>(null);
  const totalPercentage = investimentsWithTotal.totalPercentage ?? 0;
  const allStocksTotal = investimentsWithTotal.investments?.reduce(
    (acc, inv) => acc + inv.total,
    0
  );

  function clearForm() {
    setEditingGuid(null);
    setStockInput("");
    setPercentageInput("");
  }

  async function handleDelete(guid: string) {
    clearForm();
    const result = await deleteInvestmentControlWithTotalAction(guid);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
  }

  const [{ fieldErrors }, handleSubmit, isPending] = useForm({
    action: upsertInvestmentControlWithTotalAction,
  });

  function handleExportPdf() {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Relatório de Investimentos", 14, 15);

    const tableColumn = [
      "Ativo",
      "Preço Unitário",
      "Qtd Cotas",
      "Porcentagem",
      "Preço Total",
    ];

    const tableRows =
      investimentsWithTotal.investments?.map((inv) => [
        inv.stock.name,
        numberToCurrency(inv.stock.price),
        inv.stockAmount,
        `${inv.percentage}%`,
        numberToCurrency(inv.total),
      ]) ?? [];

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [240, 177, 0], textColor: [115, 62, 10] },
    });

    const total =
      investimentsWithTotal.investments?.reduce(
        (acc, inv) => acc + inv.total,
        0
      ) ?? 0;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalY = (doc as any).lastAutoTable.finalY ?? 0;
    doc.text(`Total: ${numberToCurrency(total)}`, 14, finalY + 10);

    doc.save("aportes.pdf");
  }

  return (
    <>
      <div className="w-full flex items-center justify-center gap-3 mb-4">
        <Progress value={totalPercentage} className="max-w-xs" />
        <span className="text-sm">{totalPercentage}%</span>
      </div>

      <form
        className="space-y-5"
        onSubmit={(e) => {
          handleSubmit(e, { guid: editingGuid ?? "new" }).then(() =>
            clearForm()
          );
        }}
      >
        {investimentsWithTotal.investments?.length > 0 ? (
          <div>
            <input
              type="hidden"
              name="totalInvestment"
              value={investimentsWithTotal.totalInvestment * 100}
            />
            <label className="block mb-2 font-medium">Total</label>
            <span
              className="border px-3 py-2 w-full rounded-md block cursor-default opacity-75"
              onClick={() =>
                toast.warning("Exclua todos os ativos para editar o total")
              }
            >
              {numberToCurrency(investimentsWithTotal.totalInvestment)}
            </span>
          </div>
        ) : (
          <LabelInput
            label="Total"
            name="totalInvestment"
            isCurrency
            required
            errors={fieldErrors?.totalInvestment}
            disabled={investimentsWithTotal.investments?.length > 0}
          />
        )}

        <div className="flex items-end gap-5 max-sm:flex-col max-sm:items-start">
          <div className="w-full grid grid-cols-2 gap-5 max-sm:grid-cols-1 ">
            <StockSelect
              label="Ativo"
              placeholder="Selecione um ativo"
              name="stock"
              required
              errors={fieldErrors?.stock}
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
                editingGuid
                  ? 100 -
                    totalPercentage +
                    (investimentsWithTotal.investments.find(
                      (inv) => inv.guid === editingGuid
                    )?.percentage ?? 0)
                  : 100 - totalPercentage
              }
              errors={fieldErrors?.percentage}
            />
          </div>
          <div
            className={cn(
              "flex gap-3 max-sm:self-center",
              fieldErrors && "self-center"
            )}
          >
            <MainButton
              isAddBtn
              disabled={!editingGuid && totalPercentage >= 100}
              isLoading={isPending}
            >
              {editingGuid ? "Atualizar" : "Adicionar"}
            </MainButton>

            {investimentsWithTotal.investments?.length > 0 && (
              <MainButton
                type="button"
                variant="outline"
                onClick={handleExportPdf}
              >
                <FileDown />
                Baixar PDF
              </MainButton>
            )}

            {editingGuid && (
              <MainButton variant={"secondary"} onClick={clearForm}>
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
        data={investimentsWithTotal.investments ?? []}
        header={() => (
          <>
            <TableHead>Ativo</TableHead>
            <TableHead>Preço Unitário</TableHead>
            <TableHead>Qtd Cotas</TableHead>
            <TableHead>Porcentagem</TableHead>
            <TableHead>Preço Total</TableHead>
            <TableHead />
          </>
        )}
        renderRow={(investment) => (
          <TableRow key={`investiments-${investment.guid}`}>
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

            <TableCell>{numberToCurrency(investment.stock.price)}</TableCell>

            <TableCell>{investment.stockAmount}</TableCell>

            <TableCell>{investment.percentage}%</TableCell>

            <TableCell>{numberToCurrency(investment.total)}</TableCell>

            <TableCell>
              <TableActionButtons
                onEdit={() => {
                  setEditingGuid(investment.guid);
                  setStockInput(
                    `${investment.stock.name}|${investment.stock.price}|${investment.stock.logo}`
                  );
                  setPercentageInput(investment.percentage.toString());
                }}
                onDelete={async () => await handleDelete(investment.guid)}
              />
            </TableCell>
          </TableRow>
        )}
        footer={
          investimentsWithTotal.investments?.length > 0 && (
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell>{numberToCurrency(allStocksTotal)}</TableCell>
              <TableCell />
            </TableRow>
          )
        }
      />
    </>
  );
};
