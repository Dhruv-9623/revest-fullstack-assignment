/**
 * Product interface matching the product-service response
 */
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  createdAt: Date;
}

