if (process.env.NODE_ENV !== 'production') require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

// the former gets overwritten for some reason
process.env.AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZ_STORAGE_CONNECTION_STRING;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Timesheets')
    .setDescription('The Timesheets API description')
    .setVersion('1.0')
    .addTag('timesheets')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
