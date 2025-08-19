export type InvestmentControlWithTotal = {
  totalInvestment: number;
  totalPercentage: number;
  investments: {
    guid: string;
    stock: {
      name: string;
      price: number;
      logo: string;
    };
    stockAmount: number;
    percentage: number;
    total: number;
  }[];
};
