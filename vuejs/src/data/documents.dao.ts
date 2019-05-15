import { firebaseService } from '@/services/firebase.service';
import { firestore } from 'firebase';
import { collectionData } from 'rxfire/firestore';
import { of } from 'rxjs';

export class DocumentsDao {
  readonly collection: firestore.CollectionReference;

  constructor(readonly collectionPath: string) {
    this.collection = firebaseService.firestore.collection(collectionPath);
  }

  getDocuments<T>() {
    return collectionData<T>(this.collection, 'id');
  }
  addDocument(document: firestore.DocumentData) {
    return of(this.collection.add(document));
  }
  updateDocument(document: firestore.DocumentData) {
    return of(this.collection.doc(document.id).update(document));
  }
  deleteDocument(documentId: string) {
    return of(this.collection.doc(documentId).delete());
  }
}
