import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RolesGuard } from './auth/roles.guard';
import * as cookieParser from 'cookie-parser';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle("Ecommerce Application")
  .setVersion("1.0")
  .addServer("/api")
  .addBearerAuth()
  .build();
  const documet = SwaggerModule.createDocument(app, config);
  app.setGlobalPrefix("/api");
  app.useGlobalGuards(new JwtAuthGuard(new Reflector))
  SwaggerModule.setup("api",app, documet);
  app.use(cookieParser())
  await app.listen(3003);
}
bootstrap();
