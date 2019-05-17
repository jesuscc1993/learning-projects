import { ProductsDao } from '@/data/products.dao';
import { Product } from '@/domain/product.types';
import store from '@/stores/central.store';
import { tap } from 'rxjs/operators';

class ProductsService {
  readonly productsDao: ProductsDao;

  constructor() {
    this.productsDao = new ProductsDao();
  }

  getProducts() {
    return this.productsDao.getProducts().pipe(tap(products => store.dispatch('setProducts', products)));
  }
  addProduct(product: Product) {
    // return this.productsDao.addProduct(product).pipe(tap(() => store.dispatch('addProduct', product)));
    return this.productsDao.addProduct(product);
  }
  updateProduct(product: Product) {
    // return this.productsDao.updateProduct(product).pipe(tap(() => store.dispatch('updateProduct', product)));
    return this.productsDao.updateProduct(product);
  }
  deleteProduct(productId: string) {
    // return this.productsDao.deleteProduct(productId).pipe(tap(() => store.dispatch('deleteProduct', productId)));
    return this.productsDao.deleteProduct(productId);
  }
}
export const productsService = new ProductsService();
