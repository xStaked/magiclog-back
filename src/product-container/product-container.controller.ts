import { Controller, Post, Body } from '@nestjs/common';
import { ProductContainerService } from './product-container.service';
import { CreateProductContainerDto } from './dto/create-product-container.dto';

@Controller('product-container')
export class ProductContainerController {
  constructor(
    private readonly productContainerService: ProductContainerService,
  ) {}

  @Post()
  async create(@Body() createProductContainerDto: CreateProductContainerDto) {
    return this.productContainerService.create(createProductContainerDto);
  }
}
