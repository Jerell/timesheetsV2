import {
  Controller,
  Get,
  Param,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { GoogleAuthGuard } from './auth/google/google-auth.guard';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.appService.googleLogin(req);
  }
}
