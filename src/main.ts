import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const cors = {
    origin: [
      'http://localhost:3001',
      'https://magiclog-front-enmvt00ur-sromero21s-projects.vercel.app',
    ],
  };
  app.enableCors(cors);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
