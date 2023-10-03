import { AuthModule } from './auth';
import { AdminModule } from './admin';
import { CartModule } from './cart';
import { ProductsModule } from './products';
import { UsersModule } from './users';
import { ColorsModule } from './colors';
import { SizeModule } from './size';
import { OrdersModule } from './orders';
import { AddressesModule } from './addresses';
import { ReviewsModule } from './reviews';
import { QuestionsModule } from './questions';
import { PaymentsModule } from './payments';

export const modules = [
  AdminModule,
  AuthModule,
  CartModule,
  ColorsModule,
  ProductsModule,
  SizeModule,
  UsersModule,
  AddressesModule,
  ReviewsModule,
  QuestionsModule,
  OrdersModule,
  PaymentsModule,
];
