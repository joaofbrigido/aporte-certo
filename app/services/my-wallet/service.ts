import { cookies } from "next/headers";
import { StockWallet } from "./types";

export async function createStockWalletCookie(stockWallet: StockWallet) {
  try {
    const cookieStore = await cookies();
    const myWallet = JSON.parse(
      cookieStore.get("myWallet")?.value || "[]"
    ) as StockWallet[];

    myWallet.push(stockWallet);
    cookieStore.set("myWallet", JSON.stringify(myWallet), {
      maxAge: 60 * 60 * 24 * 365 * 10, // 10 anos em segundos
      path: "/",
    });

    return { success: true, message: null };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erro ao adicionar ativo (minha carteira) no cookie.",
    };
  }
}

export async function updateStockWalletCookie({
  guid,
  stockWallet,
}: {
  guid: string;
  stockWallet: StockWallet;
}) {
  try {
    const cookieStore = await cookies();
    const myWallet = JSON.parse(
      cookieStore.get("myWallet")?.value || "[]"
    ) as StockWallet[];
    const index = myWallet.findIndex((cp) => cp.guid === guid);

    myWallet[index] = stockWallet;
    cookieStore.set("myWallet", JSON.stringify(myWallet), {
      maxAge: 60 * 60 * 24 * 365 * 10, // 10 anos em segundos
      path: "/",
    });

    return { success: true, message: null };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erro ao atualizar ativo (minha carteira) no cookie.",
    };
  }
}

export async function deleteStockWalletCookie(guid: string) {
  try {
    const cookieStore = await cookies();
    const myWallet = JSON.parse(
      cookieStore.get("myWallet")?.value || "[]"
    ) as StockWallet[];

    const filteredStockWallet = myWallet.filter((sw) => sw.guid !== guid);
    cookieStore.set("myWallet", JSON.stringify(filteredStockWallet), {
      maxAge: 60 * 60 * 24 * 365 * 10, // 10 anos em segundos
      path: "/",
    });

    return { success: true, message: null };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erro ao deletar ativo (minha carteira) no cookie.",
    };
  }
}

export async function getMyWalletCookie() {
  try {
    const cookieStore = await cookies();
    const myWallet = JSON.parse(
      cookieStore.get("myWallet")?.value || "[]"
    ) as StockWallet[];

    return { success: true, data: myWallet, message: null };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: [],
      message: "Erro ao buscar ativos da minha carteira.",
    };
  }
}
