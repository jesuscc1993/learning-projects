import { firebaseService } from '@/services/firebase.service';
import { firestore } from 'firebase';
import { collectionData } from 'rxfire/firestore';
import { from } from 'rxjs';
import { flatMap } from 'rxjs/operators';

export class DocumentsDao {
  readonly collection: firestore.CollectionReference;

  constructor(readonly collectionPath: string) {
    this.collection = firebaseService.firestore.collection(collectionPath);
  }

  protected getDocumentReference({ collectionPath, documentId }: { collectionPath?: string; documentId: string }) {
    return (collectionPath ? firebaseService.firestore.collection(collectionPath) : this.collection).doc(documentId);
  }
  protected getDocuments<T>() {
    return collectionData<T>(this.collection, 'id');
  }
  protected addDocument(document: firestore.DocumentData) {
    return from(this.collection.add(document));
  }
  protected updateDocument({ id, ...document }: firestore.DocumentData) {
    return from(this.getDocumentReference({ documentId: id }).update(document));
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
