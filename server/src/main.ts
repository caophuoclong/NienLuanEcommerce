import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RolesGuard } from './auth/roles.guard';
import * as cookieParser from 'cookie-parser';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/auth.guard';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Ecommerce Application')
    .setVersion('1.0')
    .addServer('/api')
    .addBearerAuth()
    .build();
  const documet = SwaggerModule.createDocument(app, config);
  app.setGlobalPrefix('/api');
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));
  SwaggerModule.setup('api', app, documet);
  app.use(cookieParser());

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3005',
      'https://sellerpage.pages.dev',
      'https://shop.shopifyify.shop',
      'https://shopifyify.shop',
      'https://www.shopifyify.shop',
    ],
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, OPTION, PATCH',
  });
  app.useStaticAssets(path.join(__dirname, '..', 'public', 'home'), {
    prefix: '/home/',
  });
  app.useStaticAssets(path.join(__dirname, '..', 'public', 'images'), {
    prefix: '/images/',
  });
  await app.listen(3003);
}
bootstrap();
