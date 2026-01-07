"use server";

import z from "zod";
import { StockWallet } from "../services/my-wallet/types";
import {
  createStockWalletCookie,
  deleteStockWalletCookie,
  updateStockWalletCookie,
} from "../services/my-wallet/service";

export async function upsertStockWalletAction(
  data: FormData,
  { guid }: { guid: string }
) {
  const schema = z.object({
    stock: z.string().min(1, "Selecione um ativo"),
    averagePrice: z
      .string()
      .min(1, "Informe o preço médio")
      .transform((val) => Number(val.replace(/\D/g, "")) / 100), // remove tudo que não for dígito
    quantity: z
      .string()
      .min(1, "Informe a quantidade de cotas")
      .transform((val) => Number(val)),
  });

  const result = schema.safeParse(Object.fromEntries(data));
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return { success: false, message: "", fieldErrors };
  }

  const [stockName, stockPrice, stockLogo] = result.data.stock.split("|");
  const totalPrice = result.data.quantity * Number(stockPrice);
  const variationPrice =
    totalPrice - result.data.averagePrice * result.data.quantity;
  const variationPercentage =
    (Number(stockPrice) - result.data.averagePrice) / result.data.averagePrice;

  const upsertData = {
    guid: guid === "new" ? crypto.randomUUID() : guid,
    stock: {
      name: stockName,
      price: Number(stockPrice),
      logo: stockLogo,
    },
    averagePrice: result.data.averagePrice,
    quantity: result.data.quantity,
    totalPrice,
    variationPrice,
    variationPercentage,
  } as StockWallet;

  let message;
  if (guid === "new") {
    const createResult = await createStockWalletCookie(upsertData);

    if (!createResult.success) message = createResult.message;
  } else {
    const updateResult = await updateStockWalletCookie({
      guid,
      stockWallet: upsertData,
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

export async function deleteStockWalletAction(guid: string) {
  const deleteResult = await deleteStockWalletCookie(guid);

  if (!deleteResult.success)
    return { success: false, message: deleteResult.message };

  return {
    success: true,
    message: "Ativo deletado com sucesso!",
  };
}
