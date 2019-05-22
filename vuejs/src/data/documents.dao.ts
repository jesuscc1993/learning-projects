import { firestore } from 'firebase';
import { from } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

import { firebaseService } from '../services/firebase.service';

export class DocumentsDao {
  readonly collection: firestore.CollectionReference;

  constructor(readonly collectionPath: string) {
    this.collection = firebaseService.firestore.collection(collectionPath);
  }

  protected getDocumentReference({ collectionPath, documentId }: { collectionPath?: string; documentId: string }) {
    return (collectionPath ? firebaseService.firestore.collection(collectionPath) : this.collection).doc(documentId);
  }
  protected getDocuments<T extends firestore.DocumentData>() {
    return from(this.collection.get()).pipe(
      flatMap(snapshot =>
        Promise.all(snapshot.docs.map(document => <T>(<unknown>{ id: document.id, ...document.data() })))
      )
    );
  }
  protected addDocument<T extends firestore.DocumentData>(document: firestore.DocumentData) {
    return from(this.collection.add(document)).pipe(map(({ id }) => <T>(<unknown>{ id, ...document })));
  }
  protected updateDocument<T extends firestore.DocumentData>({ id, ...document }: firestore.DocumentData) {
    return from(this.getDocumentReference({ documentId: id }).update(document)).pipe(
      map(() => <T>(<unknown>{ id, ...document }))
    );
  }
  protected deleteDocument(documentId: string) {
    return from(this.getDocumentReference({ documentId }).delete());
  }
  protected deleteAllDocuments() {
    return from(this.collection.get()).pipe(
      flatMap(snapshot => Promise.all(snapshot.docs.map(document => document.ref.delete())))
    );
  }
}
