type CompoundInterestCalculationProps = {
  initialAmount: number;
  interestRate: number;
  selectInterestRate: "annual" | "monthly";
  period: number;
  selectPeriod: "years" | "months";
  monthlyInvestment?: number | undefined;
  investmentInflation?: number | undefined;
  selectInvestmentInflation: "annual" | "monthly";
};

export type CompoundInterestResult = {
  finalTotalValue: number;
  totalAmountInvested: number;
  totalAmountInterest: number;
  valuesPerMonth: {
    month: number;
    fees: number;
    totalInvested: number;
    totalInterest: number;
    accumulated: number;
  }[];
};

export function compoundInterestCalculation({
  initialAmount,
  interestRate,
  selectInterestRate,
  period,
  selectPeriod,
  monthlyInvestment,
  investmentInflation,
  selectInvestmentInflation,
}: CompoundInterestCalculationProps): CompoundInterestResult {
  const valuesPerMonth: CompoundInterestResult["valuesPerMonth"] = [];
  let totalAmountInvested = initialAmount;
  let totalAmountInterest = 0;
  let accumulated = initialAmount;
  const totalMonths = selectPeriod === "years" ? period * 12 : period;

  const monthlyRate =
    selectInterestRate === "annual"
      ? interestRate / 12 / 100
      : interestRate / 100;

  for (let month = 0; month < totalMonths; month++) {
    const interest = accumulated * monthlyRate;
    accumulated += interest;

    totalAmountInterest += interest;

    if (monthlyInvestment) {
      accumulated += monthlyInvestment;
      totalAmountInvested += monthlyInvestment;

      // Ajusta o investimento mensal pela inflação, se aplicável
      if (
        investmentInflation &&
        selectInvestmentInflation &&
        ((selectInvestmentInflation === "annual" && (month + 1) % 12 === 0) ||
          selectInvestmentInflation === "monthly")
      ) {
        monthlyInvestment *= 1 + investmentInflation / 100;
      }
    }

    valuesPerMonth.push({
      month,
      fees: interest,
      totalInvested: totalAmountInvested,
      totalInterest: totalAmountInterest,
      accumulated,
    });
  }

  return {
    finalTotalValue: accumulated,
    totalAmountInvested,
    totalAmountInterest,
    valuesPerMonth,
  };
}
