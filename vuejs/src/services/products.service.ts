import { ProductsDao } from '@/data/products.dao';
import { Product } from '@/domain/product.types';
import store from '@/stores/central.store';
import { tap } from 'rxjs/operators';

class ProductsService {
  readonly productsDao: ProductsDao;

  constructor() {
    this.productsDao = new ProductsDao();
    this.getProducts().subscribe();
  }

  getProducts() {
    return this.productsDao.getProducts().pipe(tap(products => store.dispatch('setProducts', products)));
  }
  addProduct(productData: Product) {
    return this.productsDao.addProduct(productData).pipe(tap(product => store.dispatch('addProduct', product)));
  }
  updateProduct(productData: Product) {
    return this.productsDao.updateProduct(productData).pipe(tap(product => store.dispatch('updateProduct', product)));
  }
  deleteProduct(productId: string) {
    return this.productsDao.deleteProduct(productId).pipe(tap(() => store.dispatch('deleteProduct', productId)));
  }
}
export const productsService = new ProductsService();
