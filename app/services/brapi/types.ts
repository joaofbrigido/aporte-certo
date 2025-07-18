export type BrapiStock = {
  stocks: [
    {
      stock: string;
      name: string;
      close: number;
      change: number;
      volume: number;
      market_cap: number;
      logo: string;
      sector: string;
      type: string;
    }
  ];
};
