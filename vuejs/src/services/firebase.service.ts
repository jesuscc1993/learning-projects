import 'firebase/firestore';

import firebase from 'firebase/app';

import { environment } from '../../environments/environment';

const authProvidersDictionary: { [index: string]: { new (): firebase.auth.AuthProvider } } = {
  Email: firebase.auth.EmailAuthProvider,
  Facebook: firebase.auth.FacebookAuthProvider,
  Github: firebase.auth.GithubAuthProvider,
  Google: firebase.auth.GoogleAuthProvider,
  Phone: firebase.auth.PhoneAuthProvider,
  Twitter: firebase.auth.TwitterAuthProvider,
};

class FirebaseService {
  readonly app: firebase.app.App;
  readonly firestore: firebase.firestore.Firestore;
  readonly provider: firebase.auth.AuthProvider;

  constructor() {
    this.app = firebase.initializeApp(environment.firebaseConfig);
    this.firestore = this.app.firestore();
    this.provider = new authProvidersDictionary[environment.firebaseAuthProvider]();
  }
}
export const firebaseService = new FirebaseService();
