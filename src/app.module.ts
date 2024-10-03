import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ProductContainerModule } from './product-container/product-container.module';

@Module({
  imports: [AuthModule, ProductsModule, ProductContainerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
