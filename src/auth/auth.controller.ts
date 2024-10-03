import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUsersDto } from './dto/register-user.dto';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Req() req: Request,
    @Res() response: Response,
    @Body() userData: LoginDto,
  ) {
    try {
      const token = await this.authService.login(userData);
      console.log(token);
      return response.status(HttpStatus.OK).json({
        status: 'Ok!',
        message: 'Success',
        token,
      });
    } catch (err) {
      console.log(err);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'Error!',
        message: 'Internal Server Error!',
      });
    }
  }

  @Post('/register')
  @UsePipes(new ValidationPipe())
  async register(
    @Req() request: Request,
    @Res() response: Response,
    @Body() registerDto: RegisterUsersDto,
  ): Promise<any> {
    try {
      const result = await this.authService.register(registerDto);
      return response.status(HttpStatus.CREATED).json({
        status: 'Ok!',
        message: 'Successfully register user!',
        result: result,
      });
    } catch (err) {
      console.log(err);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'Error!',
        message: 'Internal Server Error!',
      });
    }
  }
}
