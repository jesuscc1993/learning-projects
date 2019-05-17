import { firestore } from 'firebase';

export type RowDto = {
  id?: string;
  product: firestore.DocumentReference;
  quantity?: number;
  checked?: boolean;
};
export type Row = {
  id?: string;
  product: firestore.DocumentData;
  quantity?: number;
  checked?: boolean;
};
