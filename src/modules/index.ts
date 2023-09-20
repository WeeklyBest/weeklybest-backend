import { AuthModule } from './auth';
import { AdminModule } from './admin';
import { CartModule } from './cart';
import { ProductsModule } from './products';
import { UsersModule } from './users';
import { ColorsModule } from './colors';

export const modules = [
  AdminModule,
  AuthModule,
  CartModule,
  ColorsModule,
  ProductsModule,
  UsersModule,
];
