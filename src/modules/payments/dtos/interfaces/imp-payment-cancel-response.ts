import { IIMPCommonResponse } from './imp-common-response';

export interface IIMPPaymentCancelResponse extends IIMPCommonResponse {
  response: {
    imp_uid: string;
    merchant_uid: string;
  };
}
