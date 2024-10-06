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
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/auth/entities/role.enum';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create product' })
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
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all products' })
  async getAllUserProducts(
    @Req() req: Request,
    @Res() res: Response,
    @Query() pagination: PaginationDto,
  ) {
    try {
      const result = await this.productsService.getAllProducts(pagination);

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

  @Get('/admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all products with user role equal to SELLER' })
  async getAllUserProductsWithUserInfo(
    @Req() req: Request,
    @Res() res: Response,
    @Query() pagination: PaginationDto,
  ) {
    try {
      const result =
        await this.productsService.getAllProductsWithUserData(pagination);

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
  @ApiOperation({ summary: 'Get all products related to an userId' })
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

  @Get('/match')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get products that match with query' })
  async getMatchProduct(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: { name: string },
  ) {
    try {
      const result = await this.productsService.getMatchProducts(query);

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
