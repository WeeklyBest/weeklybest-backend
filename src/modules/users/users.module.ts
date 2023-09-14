import { Module } from '@nestjs/common';

import { TypeOrmCustomModule } from '@/common';
import { UserRepository } from '@/models';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmCustomModule.forFeature([UserRepository])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
