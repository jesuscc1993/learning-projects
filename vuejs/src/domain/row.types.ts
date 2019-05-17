import { firestore } from 'firebase';

export type RowDto = {
  id?: string;
  productReference: firestore.DocumentReference;
  quantity?: number;
  checked?: boolean;
};
export type Row = {
  id?: string;
  product: firestore.DocumentData;
  quantity?: number;
  checked?: boolean;
};
