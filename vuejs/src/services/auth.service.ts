import 'firebase/firestore';

import store from '@/stores/central.store';
import firebase from 'firebase/app';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';

import { firebaseService } from './firebase.service';

class AuthService {
  signInWithPopup() {
    return from(firebase.auth().signInWithPopup(firebaseService.provider)).pipe(
      tap(({ user }) => store.dispatch('setUser', <firebase.User>user))
    );
  }
  signOut() {
    return from(firebase.auth().signOut()).pipe(tap(() => store.dispatch('removeUser')));
  }
}
export const authService = new AuthService();
