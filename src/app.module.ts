import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { APP } from './constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || APP.NODE_ENV.DEVELOPMENT}`,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
