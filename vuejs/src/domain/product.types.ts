import { CollectionDocument } from './collection.types';

export type Product = CollectionDocument & {
  name: string;
};
