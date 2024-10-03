import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request, Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createProductDto: CreateProductDto,
  ) {
    const user = req.user as any;
    const userId = user.id;
    try {
      // const
      const result = await this.productsService.create(
        createProductDto,
        userId,
      );
      return res.status(HttpStatus.CREATED).json({
        status: 201,
        message: 'Product has been created successfully',
        result,
      });
    } catch (err) {
      console.log(err);

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 500,
        message: 'Internal server error',
      });
    }
  }
}
