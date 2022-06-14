import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TasksModule } from './task/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AzureTableStorageModule } from '@nestjs/azure-database';
import { EventsModule } from './event/event.module';

@Module({
  imports: [
    AzureTableStorageModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        connectionString: configService.get<string>(
          'AZURE_STORAGE_CONNECTION_STRING'
        ),
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    TasksModule,
    UserModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
