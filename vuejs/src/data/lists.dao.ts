import { CollectionDocument } from '@/domain/collection.types';
import { List } from '@/domain/list.types';
import { Product } from '@/domain/product.types';
import { firestore } from 'firebase';
import { from } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

import { DocumentsDao } from './documents.dao';
import { productsCollectionPath } from './products.dao';
import { RowDto } from './rows.dao';

export const listsCollectionPath = 'lists';

export type ListDto = CollectionDocument & {
  id?: string;
  rows: RowDto[];
  isoDate?: string;
};

export class ListsDao extends DocumentsDao {
  constructor() {
    super(listsCollectionPath);
  }

  getLists() {
    return this.getDocuments<ListDto>().pipe(
      flatMap(lists =>
        from(
          Promise.all(
            lists.reduce(
              (promises, list) => [...promises, ...list.rows.map(row => row.productReference.get())],
              [] as Promise<firestore.DocumentSnapshot>[]
            )
          )
        ).pipe(
          map(snapshots =>
            snapshots.map(snapshot => {
              return <Product>{ id: snapshot.id, ...snapshot.data() };
            })
          ),
          map(products =>
            lists.map(({ rows, ...listData }) => ({
              ...listData,
              rows: rows.map(({ productReference, ...rowData }) => ({
                ...rowData,
                product: products.find(product => product.id === productReference.id),
              })),
            }))
          )
        )
      )
    );
  }
  addList(list: List) {
    const { id, ...listDto } = this.listToDto(list);
    return this.addDocument<ListDto>(listDto).pipe(
      map(
        ({ rows, ...listData }) =>
          <List>{
            ...listData,
            rows: rows.map(({ productReference, ...rowData }) => {
              const row = list.rows.find(row => row.id === rowData.id);
              return {
                ...rowData,
                product: row ? row.product : undefined,
              };
            }),
          }
      )
    );
  }

  private listToDto({ id, isoDate, rows }: List) {
    return <ListDto>{
      id,
      isoDate: isoDate || new Date().toISOString(),
      rows: rows.map(
        ({ product, ...row }) =>
          <RowDto>{
            ...row,
            productReference: this.getDocumentReference({
              collectionPath: productsCollectionPath,
              documentId: product.id || '',
            }),
          }
      ),
    };
  }
}
