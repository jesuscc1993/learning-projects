import { DocumentsDao } from '@/data/documents.dao';
import { Row } from '@/domain/row.types';
import store from '@/stores/central.store';
import { tap } from 'rxjs/operators';

class ListService {
  readonly rowsDao: DocumentsDao;

  constructor() {
    this.rowsDao = new DocumentsDao('rows');
  }

  getRows() {
    return this.rowsDao.getDocuments().pipe(tap(rows => store.dispatch('setRows', rows)));
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
