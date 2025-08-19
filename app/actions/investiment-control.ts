"use server";

import z from "zod";
import { InvestmentControlWithTotal } from "../services/investiment-control/types";
import {
  calculateStockAmount,
  calculateTotalPercentage,
  createInvestmentControlWithTotalCookie,
  deleteInvestmentControlWithTotalCookie,
  updateInvestmentControlWithTotalCookie,
} from "../services/investiment-control/service";

export async function upsertInvestmentControlWithTotalAction(
  data: FormData,
  { guid }: { guid: string }
) {
  const schema = z.object({
    totalInvestment: z
      .string()
      .min(1, "Informe o valor total")
      .transform((val) => Number(val.replace(/\D/g, "")) / 100),
    stock: z.string().min(1, "Selecione um ativo"),
    percentage: z
      .string()
      .min(1, "Informe uma porcentagem")
      .transform((val) => Number(val)),
  });

  const result = schema.safeParse(Object.fromEntries(data));
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return { success: false, message: "", fieldErrors };
  }

  const [stockName, stockPrice, stockLogo] = result.data.stock.split("|");

  const stockAmount = calculateStockAmount(
    result.data.totalInvestment,
    result.data.percentage,
    Number(stockPrice)
  );

  const savedTotalPercentage = await calculateTotalPercentage({
    investmentGuid: guid,
  });
  const totalPercentage = savedTotalPercentage + result.data.percentage;

  const upsertData = {
    totalInvestment: result.data.totalInvestment,
    totalPercentage: totalPercentage,
    investments: [
      {
        guid: guid === "new" ? crypto.randomUUID() : guid,
        stock: {
          name: stockName,
          price: Number(stockPrice),
          logo: stockLogo,
        },
        stockAmount: stockAmount,
        percentage: result.data.percentage,
        total: stockAmount * Number(stockPrice),
      },
    ],
  } as InvestmentControlWithTotal;

  let message;
  if (guid === "new") {
    const createResult = await createInvestmentControlWithTotalCookie(
      upsertData
    );
    if (!createResult.success) message = createResult.message;
  } else {
    const updateResult = await updateInvestmentControlWithTotalCookie({
      guid,
      investimentControl: upsertData,
    });
    if (!updateResult.success) message = updateResult.message;
  }

  if (message) {
    return { success: false, message, fieldErrors: null };
  }

  return {
    success: true,
    message: "Ativo salvo com sucesso!",
    fieldErrors: null,
  };
}

export async function deleteInvestmentControlWithTotalAction(guid: string) {
  const deleteResult = await deleteInvestmentControlWithTotalCookie(guid);

  if (!deleteResult.success)
    return { success: false, message: deleteResult.message };

  return {
    success: true,
    message: "Ativo deletado com sucesso!",
  };
}
