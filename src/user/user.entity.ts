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
  @EntityInt32() id: number;
  @EntityString() name: string;
  @EntityBoolean() admin: boolean = false;
  @EntityBoolean() active: boolean = true;
}
