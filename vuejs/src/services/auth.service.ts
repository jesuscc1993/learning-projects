import 'firebase/firestore';

import firebase from 'firebase/app';
import { from } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { showSnackbarAndReturnError } from '../domain/common';
import store from '../stores/central.store';
import { firebaseService } from './firebase.service';

class AuthService {
  signInWithPopup() {
    return from(firebase.auth().signInWithPopup(firebaseService.provider)).pipe(
      tap(({ user }) => store.dispatch('setUser', <firebase.User>user)),
      catchError(showSnackbarAndReturnError)
    );
  }
  signOut() {
    return from(firebase.auth().signOut()).pipe(
      tap(() => store.dispatch('removeUser')),
      catchError(showSnackbarAndReturnError)
    );
  }
}
export const authService = new AuthService();
