import { ProductContainer } from './product-container.entity';

export class Product {
  id: number;
  name: string;
  sku: string; // Unique identifier
  quantity: number;
  price: number;
  containerId: number;
  container: ProductContainer; // Relación con ProductContainer

  constructor(
    id: number,
    name: string,
    sku: string,
    quantity: number,
    price: number,
    containerId: number,
    container: ProductContainer,
  ) {
    this.id = id;
    this.name = name;
    this.sku = sku;
    this.quantity = quantity;
    this.price = price;
    this.containerId = containerId;
    this.container = container; // Asegúrate de manejar la relación
  }
}
