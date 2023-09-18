import { Type } from 'class-transformer';

import { SwaggerDoc } from '../doc';

export class IdParam {
  @SwaggerDoc.id()
  @Type(() => Number)
  id: number;
}
