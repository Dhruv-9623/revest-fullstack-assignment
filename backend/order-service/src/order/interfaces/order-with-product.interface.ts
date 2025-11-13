import { Order } from '../entities/order.entity';
import { Product } from './product.interface';

/**
 * Order response with full product object
 */
export interface OrderWithProduct extends Order {
  product: Product;
}

