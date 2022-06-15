import { AzureTableStorageModule } from '@nestjs/azure-database';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
  imports: [
    AzureTableStorageModule.forFeature(User, {
      table: 'users',
      createTableIfNotExists: true,
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
