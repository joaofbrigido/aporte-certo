export type CeilingPrice = {
  guid: string;
  stock: {
    name: string;
    price: number;
    logo: string;
  };
  dividendYield: number;
  dpa: number;
  ceilingPrice: number;
  safetyMargin: number;
};
