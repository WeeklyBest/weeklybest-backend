import { DocumentBuilder } from '@nestjs/swagger';

import { APP } from '@/constants';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('WeeklyBest - API')
  .setDescription('WeeklyBest E-Commerce API Docs')
  .setVersion(APP.VERSION)
  .build();
