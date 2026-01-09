import { cookies } from "next/headers";
import {
  InvestmentControlWithoutTotal,
  InvestmentControlWithTotal,
} from "./types";

// COM TOTAL
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
      JSON.stringify(newInvestment),
      {
        maxAge: 60 * 60 * 24 * 365 * 10, // 10 anos em segundos
        path: "/",
      }
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
      JSON.stringify(updateInvestment),
      {
        maxAge: 60 * 60 * 24 * 365 * 10, // 10 anos em segundos
        path: "/",
      }
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
      }),
      {
        maxAge: 60 * 60 * 24 * 365 * 10, // 10 anos em segundos
        path: "/",
      }
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

// SEM TOTAL
export async function createInvestmentControlWithoutTotalCookie(
  newInvestment: InvestmentControlWithoutTotal
) {
  try {
    const cookieStore = await cookies();
    const savedInvestments = JSON.parse(
      cookieStore.get("InvestmentsControlWithoutTotal")?.value || "[]"
    ) as InvestmentControlWithoutTotal[];

    savedInvestments.push(newInvestment);
    cookieStore.set(
      "InvestmentsControlWithoutTotal",
      JSON.stringify(savedInvestments),
      {
        maxAge: 60 * 60 * 24 * 365 * 10, // 10 anos em segundos
        path: "/",
      }
    );

    return { success: true, message: null };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        "Erro ao adicionar ativo (controle aporte - sem total) no cookie.",
    };
  }
}

export async function updateInvestmentControlWithoutTotalCookie({
  guid,
  editedInvestment,
}: {
  guid: string;
  editedInvestment: InvestmentControlWithoutTotal;
}) {
  try {
    const cookieStore = await cookies();
    const savedInvestments = JSON.parse(
      cookieStore.get("InvestmentsControlWithoutTotal")?.value || "[]"
    ) as InvestmentControlWithoutTotal[];
    const index = savedInvestments.findIndex((cp) => cp.guid === guid);

    savedInvestments[index] = editedInvestment;
    cookieStore.set(
      "InvestmentsControlWithoutTotal",
      JSON.stringify(savedInvestments),
      {
        maxAge: 60 * 60 * 24 * 365 * 10, // 10 anos em segundos
        path: "/",
      }
    );

    return { success: true, message: null };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        "Erro ao atualizar ativo (controle aporte - sem total) no cookie.",
    };
  }
}

export async function deleteInvestmentControlWithoutTotalCookie(guid: string) {
  try {
    const cookieStore = await cookies();
    const savedInvestiments = JSON.parse(
      cookieStore.get("InvestmentsControlWithoutTotal")?.value || "[]"
    ) as InvestmentControlWithoutTotal[];

    const filteredInvestments = savedInvestiments.filter(
      (investment) => investment.guid !== guid
    );
    cookieStore.set(
      "InvestmentsControlWithoutTotal",
      JSON.stringify(filteredInvestments),
      {
        maxAge: 60 * 60 * 24 * 365 * 10, // 10 anos em segundos
        path: "/",
      }
    );

    return { success: true, message: null };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erro ao deletar ativo (controle aporte - sem total) no cookie.",
    };
  }
}
