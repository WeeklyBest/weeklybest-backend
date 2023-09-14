export interface IResponseEntity {
  success: boolean;
  statusCode: number;
  data?: any;
}

export interface IErrorResponse {
  error: string;
  statusCode: number;
  message: string | string[];
}

export type SwaggerMethodDocType<T> = {
  [K in keyof T]: (summary: string) => MethodDecorator;
};

export type SwaggerFileDocType<T> = {
  [K in keyof T]: () => PropertyDecorator;
};
