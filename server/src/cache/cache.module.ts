import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

@Module({
  imports: [ConfigModule],
  providers: [{
    provide: "CACHE_MODULE",
    async useFactory(configSerivce: ConfigService) {
        const client =  createClient({
          socket: {
            host: configSerivce.get<string>("redis.host"),
            port: configSerivce.get<number>("redis.port")

          },
          password: configSerivce.get<string>("redis.password")
        });
        await client.connect();
        return client;
    },
    inject:[ConfigService]
  }],
  exports: ["CACHE_MODULE"]
})
export class CacheModule {}
