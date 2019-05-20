import { CollectionDocument } from '@/domain/collection.types';
import { List } from '@/domain/list.types';

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
    return this.getDocuments<List>();
  }
  addList(list: List) {
    const { id, ...listDto } = this.listToDto(list);
    return this.addDocument<ListDto>(listDto);
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
