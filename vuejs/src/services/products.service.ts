import { ProductsDao } from '@/data/products.dao';
import { showSnackbarAndReturnError } from '@/domain/common';
import { Product } from '@/domain/product.types';
import store from '@/stores/central.store';
import { catchError, tap } from 'rxjs/operators';

class ProductsService {
  readonly productsDao: ProductsDao;

  constructor() {
    this.productsDao = new ProductsDao();
    this.getProducts().subscribe();
  }

  getProducts() {
    return this.productsDao.getProducts().pipe(
      tap(products => store.dispatch('setProducts', products)),
      catchError(showSnackbarAndReturnError)
    );
  }
  addProduct(productData: Product) {
    return this.productsDao.addProduct(productData).pipe(
      tap(product => store.dispatch('addProduct', product)),
      catchError(showSnackbarAndReturnError)
    );
  }
  updateProduct(productData: Product) {
    return this.productsDao.updateProduct(productData).pipe(
      tap(product => store.dispatch('updateProduct', product)),
      catchError(showSnackbarAndReturnError)
    );
  }
  deleteProduct(productId: string) {
    return this.productsDao.deleteProduct(productId).pipe(
      tap(() => store.dispatch('deleteProduct', productId)),
      catchError(showSnackbarAndReturnError)
    );
  }
}
export const productsService = new ProductsService();
