import { Row, RowDto } from '@/domain/row.types';
import { from } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

import { DocumentsDao } from './documents.dao';
import { productsCollectionPath } from './products.dao';

export const rowsCollectionPath = 'rows';

export class RowsDao extends DocumentsDao {
  constructor() {
    super(rowsCollectionPath);
  }

  getRows() {
    return this.getDocuments<RowDto>().pipe(
      flatMap(rows =>
        from(Promise.all(rows.map(row => row.product.get()))).pipe(
          map(products =>
            products.map((product, i) => <Row>{ ...rows[i], product: { ...product.data(), id: rows[i].product.id } })
          )
        )
      )
    );
  }
  addRow(row: Row) {
    return this.addDocument(this.rowToDto(row));
  }
  updateRow(row: Row) {
    return this.updateDocument(this.rowToDto(row));
  }
  deleteRow(rowId: string) {
    return this.deleteDocument(rowId);
  }

  private rowToDto(row: Row): RowDto {
    return {
      ...row,
      product: this.getDocumentReference({ collectionPath: productsCollectionPath, documentId: row.product.id }),
    };
  }
}
