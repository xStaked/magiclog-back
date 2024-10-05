import {
  Controller,
  Param,
  Delete,
  Req,
  Res,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/all')
  async getAllUsers(@Req() req: Request, @Res() response: Response) {
    try {
      const result = await this.usersService.getAllusers();
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result,
      });
    } catch (err) {
      console.log(err);
      response.statusMessage = err.response.message;
      return response.status(err.status).json({
        status: err.response.statusCode,
        message: err.response.message,
      });
    }
  }

  @Get('/by-role')
  @UseGuards(JwtAuthGuard)
  async getUsersByRole(
    @Req() req: Request,
    @Res() response: Response,
    @Query('role') role: string,
  ) {
    try {
      const result = await this.usersService.getAllUsersByRole(
        role.toUpperCase() as Role,
      );
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result,
      });
    } catch (err) {
      console.log(err);
      response.statusMessage = err.response.message;
      return response.status(err.status).json({
        status: err.response.statusCode,
        message: err.response.message,
      });
    }
  }

  @Delete(':id')
  async remove(
    @Req() req: Request,
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    try {
      const result = await this.usersService.remove(+id);
      return response.status(200).json({
        status: 'Ok!',
        message: 'User deleted',
        result: result,
      });
    } catch (err) {
      console.log(err);
      response.statusMessage = err.response.message;
      return response.status(err.status).json({
        status: err.response.statusCode,
        message: err.response.message,
      });
    }
  }
}
