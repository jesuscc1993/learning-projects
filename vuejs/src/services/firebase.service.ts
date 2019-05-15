import 'firebase/firestore';

import firebase from 'firebase/app';

import { environment } from '../../environments/environment';

class FirebaseService {
  readonly app: firebase.app.App;
  readonly firestore: firebase.firestore.Firestore;

  constructor() {
    this.app = firebase.initializeApp(environment.firebaseConfig);
    this.firestore = this.app.firestore();
  }
}
export const firebaseService = new FirebaseService();
