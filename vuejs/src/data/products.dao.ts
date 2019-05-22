import { Product } from '../domain/product.types';
import { DocumentsDao } from './documents.dao';

export const productsCollectionPath = 'products';

export class ProductsDao extends DocumentsDao {
  constructor() {
    super(productsCollectionPath);
  }

  getProducts() {
    return this.getDocuments<Product>();
  }
  addProduct({ id, ...productData }: Product) {
    return this.addDocument<Product>(productData);
  }
  updateProduct(product: Product) {
    return this.updateDocument<Product>(product);
  }
  deleteProduct(productId: string) {
    return this.deleteDocument(productId);
  }
}
