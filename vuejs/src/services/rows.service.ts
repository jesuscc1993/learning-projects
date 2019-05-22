import { catchError, tap } from 'rxjs/operators';

import { RowsDao } from '../data/rows.dao';
import { showSnackbarAndReturnError } from '../domain/common';
import { Row } from '../domain/row.types';
import store from '../stores/central.store';

class RowsService {
  readonly rowsDao: RowsDao;

  constructor() {
    this.rowsDao = new RowsDao();
    this.getRows().subscribe();
  }

  getRows() {
    return this.rowsDao.getRows().pipe(
      tap(rows => store.dispatch('setRows', rows)),
      catchError(showSnackbarAndReturnError)
    );
  }
  setRows(rows: Row[]) {
    return this.rowsDao.setRows(rows).pipe(
      tap(rows => store.dispatch('setRows', rows)),
      catchError(showSnackbarAndReturnError)
    );
  }
  addRow(rowData: Row) {
    return this.rowsDao.addRow(rowData).pipe(
      tap(row => store.dispatch('addRow', row)),
      catchError(showSnackbarAndReturnError)
    );
  }
  updateRow(rowData: Row) {
    return this.rowsDao.updateRow(rowData).pipe(
      tap(row => store.dispatch('updateRow', row)),
      catchError(showSnackbarAndReturnError)
    );
  }
  deleteRow(rowId: string) {
    return this.rowsDao.deleteRow(rowId).pipe(
      tap(() => store.dispatch('deleteRow', rowId)),
      catchError(showSnackbarAndReturnError)
    );
  }
  deleteAllRows() {
    return this.rowsDao.deleteAllRows().pipe(
      tap(() => store.dispatch('deleteAllRows')),
      catchError(showSnackbarAndReturnError)
    );
  }
}
export const rowsService = new RowsService();
