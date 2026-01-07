export type StockWallet = {
  guid: string;
  stock: {
    name: string;
    price: number;
    logo: string;
  };
  averagePrice: number;
  currentPrice: number;
  quantity: number;
  totalPrice: number;
  totalPercentage: number;
  variationPrice: number;
  variationPercentage: number;
};
