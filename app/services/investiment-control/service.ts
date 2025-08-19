import { cookies } from "next/headers";
import { InvestmentControlWithTotal } from "./types";

export async function createInvestmentControlWithTotalCookie(
  investimentControl: InvestmentControlWithTotal
) {
  try {
    const cookieStore = await cookies();

    const savedInvestiment = JSON.parse(
      cookieStore.get("InvestmentControlWithTotal")?.value || "{}"
    ) as Partial<InvestmentControlWithTotal>;

    const existingInvestments = Array.isArray(savedInvestiment.investments)
      ? savedInvestiment.investments
      : [];

    const newInvestment: InvestmentControlWithTotal = {
      totalInvestment: investimentControl.totalInvestment,
      totalPercentage: investimentControl.totalPercentage,
      investments: [...existingInvestments, investimentControl.investments[0]],
    };

    cookieStore.set(
      "InvestmentControlWithTotal",
      JSON.stringify(newInvestment)
    );

    return { success: true, message: null };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erro ao adicionar ativo (aporte) no cookie.",
    };
  }
}

export async function updateInvestmentControlWithTotalCookie({
  guid,
  investimentControl,
}: {
  guid: string;
  investimentControl: InvestmentControlWithTotal;
}) {
  try {
    const cookieStore = await cookies();
    const savedInvestiment = JSON.parse(
      cookieStore.get("InvestmentControlWithTotal")?.value || "{}"
    ) as InvestmentControlWithTotal;

    const updateInvestment = {
      totalInvestment: investimentControl.totalInvestment,
      totalPercentage: investimentControl.totalPercentage,
      investments: savedInvestiment.investments.map((inv) => {
        if (inv.guid === guid) {
          return {
            ...inv,
            stock: investimentControl.investments[0].stock,
            stockAmount: investimentControl.investments[0].stockAmount,
            percentage: investimentControl.investments[0].percentage,
            total: investimentControl.investments[0].total,
          };
        } else {
          return inv;
        }
      }),
    } as InvestmentControlWithTotal;

    cookieStore.set(
      "InvestmentControlWithTotal",
      JSON.stringify(updateInvestment)
    );

    return { success: true, message: null };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erro ao atualizar ativo (aporte) no cookie.",
    };
  }
}

export async function deleteInvestmentControlWithTotalCookie(guid: string) {
  try {
    const cookieStore = await cookies();
    const savedInvestiment = JSON.parse(
      cookieStore.get("InvestmentControlWithTotal")?.value || "[]"
    ) as InvestmentControlWithTotal;

    const filteredInvestiments = savedInvestiment.investments.filter(
      (investiment) => investiment.guid !== guid
    );
    const newTotalPercentage = filteredInvestiments.reduce(
      (acc, investiment) => acc + investiment.percentage,
      0
    );

    cookieStore.set(
      "InvestmentControlWithTotal",
      JSON.stringify({
        ...savedInvestiment,
        totalPercentage: newTotalPercentage,
        investments: filteredInvestiments,
      })
    );

    return { success: true, message: null };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erro ao deletar ativo (aporte) no cookie.",
    };
  }
}

export async function calculateTotalPercentage({
  investmentGuid,
}: {
  investmentGuid: string;
}) {
  const cookieStore = await cookies();
  const savedInvestiment = JSON.parse(
    cookieStore.get("InvestmentControlWithTotal")?.value || "[]"
  ) as InvestmentControlWithTotal;

  if (!savedInvestiment.investments) return 0;

  let total = 0;
  if (investmentGuid === "new") {
    total = savedInvestiment.investments.reduce(
      (acc, investiment) => acc + investiment.percentage,
      0
    );
    return total;
  } else {
    total = savedInvestiment.investments
      .filter((investiment) => investiment.guid !== investmentGuid)
      .reduce((acc, investiment) => acc + investiment.percentage, 0);
  }

  return total;
}

export function calculateStockAmount(
  totalInvestment: number,
  percentage: number,
  sotckPrice: number
) {
  return Math.ceil((totalInvestment * (percentage / 100)) / sotckPrice);
}
