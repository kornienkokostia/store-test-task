export interface Product {
  id: string;
  title: string;
  description: string;
  price: {
    usd: number;
    euro: number;
    hryvnia: number;
  };
  images: string[];
}
export type Currency = 'usd' | 'euro' | 'hryvnia'

export interface BagItem {
  item: Product;
  qty: number;
}

export interface SavedDataItem {
  id: string;
  qty: number;
}