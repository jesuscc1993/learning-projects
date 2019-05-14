import { Product } from '@/domain/products.js';
import { of } from 'rxjs';

import products from '../data/dummyProducts.json';

class ProductsDao {
  getProducts() {
    return of(products as Product[]);
  }
  addProduct(product: Product) {
    return of(product);
  }
  updateProduct(product: Product) {
    return of(product);
  }
  deleteProduct(productId: number) {
    return of(productId);
  }
}
export const productsDao = new ProductsDao();
