import {
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
  EntityBoolean,
  EntityInt32,
} from '@nestjs/azure-database';

@EntityPartitionKey('User')
@EntityRowKey('')
export class User {
  @EntityString() id: string;
  @EntityString() name: string;
  @EntityBoolean() admin: boolean = false;
  @EntityBoolean() active: boolean = true;
}
