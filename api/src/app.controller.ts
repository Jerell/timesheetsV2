import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { HeaderApiKeyGuard } from './auth/header-api-key/header-api-key.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('protected')
  @UseGuards(HeaderApiKeyGuard)
  getProtected() {
    return 1;
  }
}
