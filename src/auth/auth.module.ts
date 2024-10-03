import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { jwtConstants } from './constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    PassportModule,
    // JwtModule.registerAsync({
    //   useFactory: () => {
    //     return {
    //       secret: 'THE123#@',
    //       signOptions: {
    //         expiresIn: '10d',
    //       },
    //     };
    //   },
    // }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [AuthService, LocalStrategy, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
