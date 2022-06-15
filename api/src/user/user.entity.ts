import {
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
  EntityBoolean,
} from '@nestjs/azure-database';

@EntityPartitionKey('User')
@EntityRowKey('')
export class User {
  @EntityString() id: string;
  @EntityString() name: string;
  @EntityBoolean() admin = false;
  @EntityBoolean() active = true;
}
