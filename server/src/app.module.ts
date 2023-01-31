import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigsModule } from './configs/configs.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, ConfigsModule, ProductsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
