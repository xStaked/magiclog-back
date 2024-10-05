import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUsersDto } from './dto/register-user.dto';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/validate')
  @UseGuards(JwtAuthGuard)
  async validateSession(@Req() req: Request, @Res() response: Response) {
    try {
      const user = req.user as any;
      const userId = user.id;

      const userSession = await this.authService.validateSession(userId);
      console.log('usersession executed', userSession);
      return response.status(HttpStatus.OK).json({
        status: 'Ok!',
        message: 'Success',
        user: userSession,
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

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Req() req: Request,
    @Res() response: Response,
    @Body() userData: LoginDto,
  ) {
    try {
      const data = await this.authService.login(userData);
      console.log(data);
      return response.status(HttpStatus.OK).json({
        status: 'Ok!',
        message: 'Success',
        result: {
          token: data.token,
          user: data.user,
        },
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

  @Post('/register')
  @UsePipes(new ValidationPipe())
  async register(
    @Req() request: Request,
    @Res() response: Response,
    @Body() registerDto: RegisterUsersDto,
  ): Promise<any> {
    try {
      const data = await this.authService.register(registerDto);
      return response.status(HttpStatus.CREATED).json({
        status: 'Ok!',
        message: 'Successfully register user!',
        result: {
          token: data.token,
          user: data.user,
        },
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
