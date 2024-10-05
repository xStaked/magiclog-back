import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductContainerService } from 'src/product-container/product-container.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(
    // private JwtService: JwtService,
    private prismaService: PrismaService,
    private productContainerService: ProductContainerService,
  ) {}

  async create(createProductDto: CreateProductDto, id: number | null) {
    const { name, sku, quantity, price, containerId } = createProductDto;

    console.log('user', id);

    const existingProduct = await this.prismaService.product.findUnique({
      where: { sku },
    });

    if (existingProduct) {
      throw new NotFoundException('Product with this SKU already exists.');
    }

    let productContainerId;

    if (!containerId) {
      console.log('creating product container');

      const productContainer = await this.productContainerService.create({
        name: '',
        userId: id,
      });

      productContainerId = productContainer.id;
      console.log('productContainerId', productContainerId);
    }

    const product = await this.prismaService.product.create({
      data: {
        name,
        sku,
        quantity,
        price,
        containerId: containerId || productContainerId,
      },
    });

    return product;
  }

  async getAllProducts(paginationDTO: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDTO;

    const products = await this.prismaService.product.findMany({
      skip: Number(offset),
      take: Number(limit),
    });

    return products;
  }

  async getAllProductsWithUserData(paginationDTO: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDTO;

    const products = await this.prismaService.product.findMany({
      where: {
        container: {
          user: {
            role: 'SELLER',
          },
        },
      },
      skip: Number(offset),
      take: Number(limit),
      include: {
        container: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                username: true,
                role: true,
              },
            },
          },
        },
      },
    });

    return products;
  }

  async getAllProductsByUser(userId: number, paginationDTO: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDTO;
    const products = await this.prismaService.product.findMany({
      where: {
        container: {
          userId,
        },
      },
      skip: Number(offset),
      take: Number(limit),
    });

    console.log(userId);
    console.log(products);

    return products;
  }
}
