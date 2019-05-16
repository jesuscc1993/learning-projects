import { RowsDao } from '@/data/rows.dao';
import { Row } from '@/domain/row.types';
import store from '@/stores/central.store';
import { tap } from 'rxjs/operators';

class RowsService {
  readonly rowsDao: RowsDao;

  constructor() {
    this.rowsDao = new RowsDao();
  }

  getRows() {
    return this.rowsDao.getRows().pipe(tap(rows => store.dispatch('setRows', rows)));
  }
  addRow(row: Row) {
    return this.rowsDao.addRow(row).pipe(tap(() => store.dispatch('addRow', row)));
  }
  updateRow(row: Row) {
    return this.rowsDao.updateRow(row).pipe(tap(() => store.dispatch('updateRow', row)));
  }
  deleteRow(rowId: string) {
    return this.rowsDao.deleteRow(rowId).pipe(tap(() => store.dispatch('deleteRow', rowId)));
  }
}
export const rowsService = new RowsService();
