export type SwaggerMethodDocType<T> = {
  [K in keyof T]: (summary: string) => MethodDecorator;
};

export type SwaggerFiledDocType<T> = {
  [K in keyof T]?: () => PropertyDecorator;
};

export type SwaggerEntityDocType<Entity> = SwaggerFiledDocType<Entity>;
