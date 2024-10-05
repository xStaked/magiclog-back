import { User } from './user.entity';
import { Product } from './product.entity';

export class ProductContainer {
  id: number;
  name?: string;
  createdAt: Date;
  userId: number;
  user: User;
  products: Product[];

  constructor(
    id: number,
    name: string | null,
    createdAt: Date,
    userId: number,
    user: User,
    products: Product[],
  ) {
    this.id = id;
    this.name = name || null;
    this.createdAt = createdAt;
    this.userId = userId;
    this.user = user;
    this.products = products;
  }
}
