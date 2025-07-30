import { cookies } from "next/headers";
import { CeilingPrice } from "./types";

export async function createCeilingPriceCookie(ceilingPrice: CeilingPrice) {
  try {
    const cookieStore = await cookies();
    const ceilingPrices = JSON.parse(
      cookieStore.get("ceilingPrices")?.value || "[]"
    ) as CeilingPrice[];

    ceilingPrices.push(ceilingPrice);
    cookieStore.set("ceilingPrices", JSON.stringify(ceilingPrices));

    return { success: true, message: null };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erro ao adicionar ativo (preço teto) no cookie.",
    };
  }
}

export async function updateCeilingPriceCookie({
  guid,
  ceilingPrice,
}: {
  guid: string;
  ceilingPrice: CeilingPrice;
}) {
  try {
    const cookieStore = await cookies();
    const ceilingPrices = JSON.parse(
      cookieStore.get("ceilingPrices")?.value || "[]"
    ) as CeilingPrice[];
    const index = ceilingPrices.findIndex((cp) => cp.guid === guid);

    ceilingPrices[index] = ceilingPrice;
    cookieStore.set("ceilingPrices", JSON.stringify(ceilingPrices));

    return { success: true, message: null };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erro ao atualizar ativo (preço teto) no cookie.",
    };
  }
}

export async function deleteCeilingPriceCookie(guid: string) {
  try {
    const cookieStore = await cookies();
    const ceilingPrices = JSON.parse(
      cookieStore.get("ceilingPrices")?.value || "[]"
    ) as CeilingPrice[];

    const filteredCeilingPrices = ceilingPrices.filter(
      (cp) => cp.guid !== guid
    );
    cookieStore.set("ceilingPrices", JSON.stringify(filteredCeilingPrices));

    return { success: true, message: null };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erro ao deletar ativo (preço teto) no cookie.",
    };
  }
}

export async function getCeilingPricesCookie() {
  try {
    const cookieStore = await cookies();
    const ceilingPrices = JSON.parse(
      cookieStore.get("ceilingPrices")?.value || "[]"
    ) as CeilingPrice[];

    return { success: true, data: ceilingPrices, message: null };
  } catch (error) {
    console.error(error);
    return { success: false, data: [], message: "Erro ao buscar ativos." };
  }
}
