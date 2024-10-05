import { Role } from './role.enum';
import { ProductContainer } from './product-container.entity'; // Importa la entidad relacionada si es necesario

export class User {
  id: number;
  email: string;
  password: string;
  username: string;
  role: Role;
  createdAt: Date;
  containers: ProductContainer[];

  constructor(
    id: number,
    email: string,
    password: string,
    username: string,
    role: Role,
    createdAt: Date,
    containers: ProductContainer[],
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
    this.role = role;
    this.createdAt = createdAt;
    this.containers = containers;
  }
}
