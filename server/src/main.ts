import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle("Ecommerce Application")
  .setVersion("1.0")
  .build();
  const documet = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api",app, documet);
  app.setGlobalPrefix("/api");
  await app.listen(3003);
}
bootstrap();
