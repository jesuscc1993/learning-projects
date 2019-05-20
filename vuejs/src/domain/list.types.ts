import { CollectionDocument } from './collection.types';
import { Row } from './row.types';

export type List = CollectionDocument & {
  rows: Row[];
  isoDate?: string;
};
