import { Product } from '@/domain/products';
import { productsStore } from '@/stores/products.store';
import { tap } from 'rxjs/operators';

import { productsDao } from '../data/products.dao';

class ProductsService {
  getProducts() {
    return productsDao.getProducts().pipe(tap(products => productsStore.dispatch('setProducts', products)));
  }
  addProduct(product: Product) {
    return productsDao.addProduct(product).pipe(tap(() => productsStore.dispatch('addProduct', product)));
  }
  updateProduct(product: Product) {
    return productsDao.updateProduct(product).pipe(tap(() => productsStore.dispatch('updateProduct', product)));
  }
  deleteProduct(productId: string) {
    return productsDao.deleteProduct(productId).pipe(tap(() => productsStore.dispatch('deleteProduct', productId)));
  }
}
export const productsService = new ProductsService();
