import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dbConfig } from '@/configs';
import { APP, CONFIG } from '@/constants';
import { modules } from '@/modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || APP.NODE_ENV.DEVELOPMENT}`,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get(CONFIG.DB),
      inject: [ConfigService],
    }),
    ...modules,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
