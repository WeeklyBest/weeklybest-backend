import { DocumentBuilder } from '@nestjs/swagger';

import { APP } from '@/constants';

const BEARER_AUTH_NAME = 'Access Token';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('WeeklyBest - API')
  .setDescription('WeeklyBest E-Commerce API Docs')
  .setVersion(APP.VERSION)
  .addBearerAuth(
    {
      type: 'http',
      description:
        'HTTP Request의 Authorization 헤더로 넘어올 JWT Access 토큰을 넣어주세요.',
    },
    BEARER_AUTH_NAME,
  )
  .addSecurityRequirements(BEARER_AUTH_NAME)
  .build();
