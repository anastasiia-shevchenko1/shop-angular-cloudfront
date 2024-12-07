import { Product } from '../products/product.interface';

export interface CartResponse {
  data: {
    cart: {
      user_id: string;
      items: Array<{
        product: Product;
        count: number;
      }>;
    };
  };
}
