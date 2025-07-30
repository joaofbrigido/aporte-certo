"use server";

import z from "zod";
import {
  createCeilingPriceCookie,
  deleteCeilingPriceCookie,
  updateCeilingPriceCookie,
} from "../services/ceiling-price/service";
import { CeilingPrice } from "../services/ceiling-price/types";

export async function upsertCeilingPriceAction(
  data: FormData,
  { guid }: { guid: string }
) {
  const schema = z.object({
    stock: z.string().min(1, "Selecione um ativo"),
    dividendYield: z
      .string()
      .min(1, "Informe o Dividend Yield")
      .transform((val) => Number(val.replace(/\./g, "").replace(",", "."))),
    dpa: z
      .string()
      .min(1, "Informe o valor total")
      .transform((val) => Number(val.replace(/\D/g, "")) / 100), // remove tudo que não for dígito
  });

  const result = schema.safeParse(Object.fromEntries(data));
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return { success: false, message: "", fieldErrors };
  }

  const [stockName, stockPrice, stockLogo] = result.data.stock.split("|");
  const ceilingPrice = result.data.dpa / (result.data.dividendYield / 100);
  const safetyMargin = 1 - Number(stockPrice) / ceilingPrice;
  const upsertData = {
    guid: guid === "new" ? crypto.randomUUID() : guid,
    stock: {
      name: stockName,
      price: Number(stockPrice),
      logo: stockLogo,
    },
    dividendYield: result.data.dividendYield,
    dpa: result.data.dpa,
    ceilingPrice: +ceilingPrice.toFixed(2),
    safetyMargin: +safetyMargin.toFixed(2),
  } as CeilingPrice;

  let message;
  if (guid === "new") {
    const createResult = await createCeilingPriceCookie(upsertData);

    if (!createResult.success) message = createResult.message;
  } else {
    const updateResult = await updateCeilingPriceCookie({
      guid,
      ceilingPrice: upsertData,
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

export async function deleteCeilingPriceAction(guid: string) {
  const deleteResult = await deleteCeilingPriceCookie(guid);

  if (!deleteResult.success)
    return { success: false, message: deleteResult.message };

  return {
    success: true,
    message: "Ativo deletado com sucesso!",
  };
}
