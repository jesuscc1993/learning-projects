import { Product } from './product.types';

export type Row = {
  id?: string;
  product: Product;
  quantity: number;
};
