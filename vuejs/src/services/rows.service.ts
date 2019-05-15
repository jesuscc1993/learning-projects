import { DocumentsDao } from '@/data/documents.dao';
import { Row, RowDto } from '@/domain/row.types';
import store from '@/stores/central.store';
import { from } from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';

class ListService {
  readonly rowsDao: DocumentsDao;

  constructor() {
    this.rowsDao = new DocumentsDao('rows');
  }

  getRows() {
    return this.rowsDao.getDocuments<RowDto>().pipe(
      flatMap(rows =>
        from(Promise.all(rows.map(row => row.product.get()))).pipe(
          map(products => products.map((product, i) => <Row>{ ...rows[i], product: product.data() }))
        )
      ),
      tap(rows => store.dispatch('setRows', rows))
    );
  }
  addRow(row: Row) {
    return this.rowsDao.addDocument(row).pipe(tap(() => store.dispatch('addRow', row)));
  }
  updateRow(row: Row) {
    return this.rowsDao.updateDocument(row).pipe(tap(() => store.dispatch('updateRow', row)));
  }
  deleteRow(rowId: string) {
    return this.rowsDao.deleteDocument(rowId).pipe(tap(() => store.dispatch('deleteRow', rowId)));
  }
}
export const rowsService = new ListService();
