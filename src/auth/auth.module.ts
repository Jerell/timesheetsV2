import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { GoogleAuthModule } from './google/google-auth.module';

@Module({
  controllers: [],
  imports: [UsersModule, PassportModule, GoogleAuthModule, JwtAuthModule],
})
export class AuthModule {}
