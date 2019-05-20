import { RowsDao } from '@/data/rows.dao';
import { Row } from '@/domain/row.types';
import store from '@/stores/central.store';
import { tap } from 'rxjs/operators';

class RowsService {
  readonly rowsDao: RowsDao;

  constructor() {
    this.rowsDao = new RowsDao();
    this.getRows().subscribe();
  }

  getRows() {
    return this.rowsDao.getRows().pipe(tap(rows => store.dispatch('setRows', rows)));
  }
  setRows(rows: Row[]) {
    return this.rowsDao.setRows(rows).pipe(tap(rows => store.dispatch('setRows', rows)));
  }
  addRow(rowData: Row) {
    return this.rowsDao.addRow(rowData).pipe(tap(row => store.dispatch('addRow', row)));
  }
  updateRow(rowData: Row) {
    return this.rowsDao.updateRow(rowData).pipe(tap(row => store.dispatch('updateRow', row)));
  }
  deleteRow(rowId: string) {
    return this.rowsDao.deleteRow(rowId).pipe(tap(() => store.dispatch('deleteRow', rowId)));
  }
  deleteAllRows() {
    return this.rowsDao.deleteAllRows().pipe(tap(() => store.dispatch('deleteAllRows')));
  }
}
export const rowsService = new RowsService();
