import { firestore } from 'firebase';

export type RowDto = {
  id?: string;
  product: firestore.DocumentReference;
  quantity?: number;
};
export type Row = {
  id?: string;
  product: firestore.DocumentData;
  quantity?: number;
};
