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
  Get,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request, Response } from 'express';
import { PaginationDto } from 'src/common/dto/pagination.dto';

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

      res.statusMessage = err.response.message;
      return res.status(err.status).json({
        status: err.response.statusCode,
        message: err.response.message,
      });
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async getAllUserProducts(
    @Req() req: Request,
    @Res() res: Response,
    @Query() pagination: PaginationDto,
  ) {
    const user = req.user as any;
    const userId = user.id;

    try {
      const result = await this.productsService.getAllUserProducts(
        userId,
        pagination,
      );

      return res.status(HttpStatus.OK).json({
        staus: 200,
        message: 'ok',
        result,
      });
    } catch (err) {
      console.log(err);
      res.statusMessage = err.response.message;
      return res.status(err.status).json({
        status: err.response.statusCode,
        message: err.response.message,
      });
    }
  }

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async getAllProductsByUseer(
    @Req() req: Request,
    @Res() res: Response,
    @Query() pagination: PaginationDto,
  ) {
    const user = req.user as any;
    const userId = user.id;

    try {
      const result = await this.productsService.getAllProductsByUser(
        userId,
        pagination,
      );

      return res.status(HttpStatus.OK).json({
        staus: 200,
        message: 'ok',
        result,
      });
    } catch (err) {
      console.log(err);

      res.statusMessage = err.response.message;
      return res.status(err.status).json({
        status: err.response.statusCode,
        message: err.response.message,
      });
    }
  }
}
