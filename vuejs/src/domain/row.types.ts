import { CollectionDocument } from './collection.types';
import { Product } from './product.types';

export type Row = CollectionDocument & {
  product: Product;
  quantity?: number;
  checked?: boolean;
};
