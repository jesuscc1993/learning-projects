import { throwError } from 'rxjs';

import store from '../stores/central.store';

export const showSnackbarAndReturnError = (error: Error) => {
  // alert(error);
  store.dispatch('setSnackbar', {
    text: error.message,
    color: 'red',
  });
  return throwError(error);
};
