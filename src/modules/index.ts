import { AuthModule } from './auth';
import { AdminModule } from './auth/admin';
import { ProductsModule } from './products';
import { UsersModule } from './users';

export const modules = [AdminModule, AuthModule, UsersModule, ProductsModule];
