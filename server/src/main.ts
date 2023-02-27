import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RolesGuard } from './auth/roles.guard';
import * as cookieParser from 'cookie-parser';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/auth.guard';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from "path";
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = new DocumentBuilder()
  .setTitle("Ecommerce Application")
  .setVersion("1.0")
  .addServer("/api")
  .addBearerAuth()
  .build();
  const documet = SwaggerModule.createDocument(app, config);
  app.enableCors({
  origin: [
    'http://localhost:3000',
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
});
  app.setGlobalPrefix("/api");
  app.useGlobalGuards(new JwtAuthGuard(new Reflector))
  SwaggerModule.setup("api",app, documet);
  app.use(cookieParser())
  app.useStaticAssets(path.join(__dirname, "..", "public", "home"),{
    prefix: "/home/"
  })
  app.enableCors()
  await app.listen(3003);
}
bootstrap();
