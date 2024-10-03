import { Injectable } from '@nestjs/common';
import { CreateProductContainerDto } from './dto/create-product-container.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductContainerService {
  constructor(
    // private JwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async create(createProductContainerDto: CreateProductContainerDto) {
    const { name, userId } = createProductContainerDto;

    const productContainer = await this.prismaService.productContainer.create({
      data: {
        name,
        userId,
      },
    });

    return productContainer;
  }
}
