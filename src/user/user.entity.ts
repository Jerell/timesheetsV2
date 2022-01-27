import {
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
  EntityBoolean,
} from '@nestjs/azure-database';

@EntityPartitionKey('User')
@EntityRowKey('id')
export class User {
  @EntityString() id: string;
  @EntityString() name: string;
  @EntityString() email: string;
  @EntityBoolean() admin: boolean;
}
