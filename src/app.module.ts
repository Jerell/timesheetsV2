import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TasksModule } from './task/tasks.module';
import { JwtAuthModule } from './auth/jwt/jwt-auth.module';
import { UsersModule } from './users/users.module';
import { GoogleStrategy } from './auth/google/google.strategy';
import { ConfigModule } from '@nestjs/config';
import { GoogleAuthController } from './auth/google/google-auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TasksModule,
    JwtAuthModule,
    UsersModule,
  ],
  controllers: [AppController, GoogleAuthController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
