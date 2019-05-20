import { CollectionDocument } from '@/domain/collection.types';
import { Product } from '@/domain/product.types';
import { Row } from '@/domain/row.types';
import { firestore } from 'firebase';
import { from } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

import { DocumentsDao } from './documents.dao';
import { productsCollectionPath } from './products.dao';

export const rowsCollectionPath = 'rows';

export type RowDto = CollectionDocument & {
  productReference: firestore.DocumentReference;
  quantity?: number;
  checked?: boolean;
};

export class RowsDao extends DocumentsDao {
  constructor() {
    super(rowsCollectionPath);
  }

  getRows() {
    return this.getDocuments<RowDto>().pipe(
      flatMap(rows =>
        from(Promise.all(rows.map(row => row.productReference.get()))).pipe(
          map(products =>
            products.map(
              (product, i) =>
                <Row>{ ...rows[i], product: <Product>{ ...product.data(), id: rows[i].productReference.id } }
            )
          )
        )
      )
    );
  }
  addRow(row: Row) {
    const { id, ...rowDto } = this.rowToDto(row);
    return this.addDocument<RowDto>(rowDto).pipe(map(rowDto => <Row>{ ...rowDto, product: row.product }));
  }
  updateRow(row: Row) {
    return this.updateDocument<RowDto>(this.rowToDto(row)).pipe(
      map(rowDto => <Row>{ ...rowDto, product: row.product })
    );
  }
  deleteRow(rowId: string) {
    return this.deleteDocument(rowId);
  }
  deleteAllRows() {
    return this.deleteAllDocuments();
  }

  private rowToDto({ product, ...row }: Row) {
    return <RowDto>{
      ...row,
      productReference: this.getDocumentReference({
        collectionPath: productsCollectionPath,
        documentId: product.id || '',
      }),
    };
  }
}
