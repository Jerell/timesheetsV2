import { Module } from '@nestjs/common';
import { GoogleAuthController } from './google-auth.controller';
import { JwtAuthModule } from '../jwt/jwt-auth.module';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [JwtAuthModule],
  controllers: [GoogleAuthController],
  providers: [GoogleStrategy],
})
export class GoogleAuthModule {}
