import { Product } from '@/domain/product.types';

import { DocumentsDao } from './documents.dao';

export const productsCollectionPath = 'products';

export class ProductsDao extends DocumentsDao {
  constructor() {
    super(productsCollectionPath);
  }

  getProducts() {
    return this.getDocuments<Product>();
  }
  addProduct(product: Product) {
    return this.addDocument(product);
  }
  updateProduct(product: Product) {
    return this.updateDocument(product);
  }
  deleteProduct(productId: string) {
    return this.deleteDocument(productId);
  }
}
