import { AuthModule } from './auth';
import { AdminModule } from './admin';
import { CartModule } from './cart';
import { ProductsModule } from './products';
import { UsersModule } from './users';
import { ColorsModule } from './colors';
import { SizeModule } from './size';
import { OrdersModule } from './orders';

export const modules = [
  AdminModule,
  AuthModule,
  CartModule,
  ColorsModule,
  OrdersModule,
  ProductsModule,
  SizeModule,
  UsersModule,
];
