import { Product } from '@/domain/products.js';
import { firebaseService } from '@/services/firebase.service';
import { collectionData } from 'rxfire/firestore';
import { of } from 'rxjs';

class ProductsDao {
  getProducts() {
    // return of(products as Product[]);
    return collectionData(firebaseService.collection('products'), 'id');
  }
  addProduct(product: Product) {
    // return of(product);
    return of(firebaseService.collection('products').add(product));
  }
  updateProduct(product: Product) {
    // return of(product);
    return of(
      firebaseService
        .collection('products')
        .doc(product.id)
        .update(product)
    );
  }
  deleteProduct(productId: string) {
    // return of(productId);
    return of(
      firebaseService
        .collection('products')
        .doc(productId)
        .delete()
    );
  }
}
export const productsDao = new ProductsDao();
