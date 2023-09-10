import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';

import * as expressBasicAuth from 'express-basic-auth';

import { AppModule } from './app.module';
import { corsConfig, swaggerConfig } from './configs';
import { API_URL, APP } from './constants';

class Application {
  private logger = new Logger(Application.name);
  private PORT: string;
  private DEV_MODE: boolean;

  constructor(private app: NestExpressApplication) {
    this.app = app;
    this.PORT = process.env.PORT;
    this.DEV_MODE = process.env.NODE_ENV === APP.NODE_ENV.DEVELOPMENT;
  }

  private async setUpOpenAPI() {
    this.app.use(
      [API_URL.SWAGGER.DOCS, API_URL.SWAGGER.DOCS_JSON],
      expressBasicAuth({
        challenge: true,
        users: {
          [process.env.ADMIN_USER]: process.env.ADMIN_PASSWORD,
        },
      }),
    );

    const document = SwaggerModule.createDocument(this.app, swaggerConfig);
    SwaggerModule.setup(API_URL.SWAGGER.DOCS, this.app, document);
  }

  private async setUpGlobalMiddleware() {
    this.app.enableCors(corsConfig(this.DEV_MODE));
    this.setUpOpenAPI();
  }

  async bootstrap() {
    await this.setUpGlobalMiddleware();
    await this.app.listen(this.PORT);
  }

  startLog() {
    this.logger.log(`✅ Server on http://localhost:${this.PORT}`);
  }
}

async function init() {
  const server = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const app = new Application(server);
  await app.bootstrap();
  app.startLog();
}

init();
