import { DocumentsDao } from '@/data/documents.dao';
import { Product } from '@/domain/product.types';
import { productsStore } from '@/stores/products.store';
import { tap } from 'rxjs/operators';

class ProductsService {
  readonly productsDao: DocumentsDao;

  constructor() {
    this.productsDao = new DocumentsDao('products');
  }

  getProducts() {
    return this.productsDao.getDocuments().pipe(tap(products => productsStore.dispatch('setProducts', products)));
  }
  addProduct(product: Product) {
    return this.productsDao.addDocument(product).pipe(tap(() => productsStore.dispatch('addProduct', product)));
  }
  updateProduct(product: Product) {
    return this.productsDao.updateDocument(product).pipe(tap(() => productsStore.dispatch('updateProduct', product)));
  }
  deleteProduct(productId: string) {
    return this.productsDao
      .deleteDocument(productId)
      .pipe(tap(() => productsStore.dispatch('deleteProduct', productId)));
  }
}
export const productsService = new ProductsService();
