import { IImpRestApiResponse } from '../interfaces';

export class ImpRestApiDto {
  code?: number;
  message?: string | null;
  response?: IImpRestApiResponse;
}
