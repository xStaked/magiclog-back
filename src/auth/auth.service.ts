import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterUsersDto } from './dto/register-user.dto';
import { Role } from './entities/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private JwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async validateUser(username: string, password: string) {
    // const users: User[] = [
    //   {
    //     username: 'test',
    //     password: '1234556',
    //     role: Role.ADMIN,
    //     id: 1,
    //     email: 'email@email.com',
    //     createdAt: '',
    //   },
    // ];

    // const user: User = users.find(
    //   (item) => item.username === username && item.password === password,
    // );
    // if (user) return user;

    return null;
  }

  async login(user: LoginDto): Promise<any> {
    const { email, password } = user;
    const searchUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    console.log('search usa', searchUser);
    if (!searchUser) {
      throw new NotFoundException('user not found');
    }

    const validatePassword = await bcrypt.compare(
      password,
      searchUser.password,
    );

    if (!validatePassword) throw new NotFoundException('Invalid password');

    return {
      token: this.JwtService.sign({
        user: {
          id: searchUser.id,
          role: searchUser.role,
          email: searchUser.email,
        },
      }),
    };
  }

  async register(userData: RegisterUsersDto): Promise<any> {
    const exists = await this.prismaService.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (exists) throw new ConflictException('email already exists');

    const user = await this.prismaService.user.create({
      data: {
        ...userData,
        password: (userData.password = await bcrypt.hash(
          userData.password,
          10,
        )),
        role: 'SELLER',
      },
    });

    return {
      token: this.JwtService.sign(user),
    };
  }
}
