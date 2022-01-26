import {
  Controller,
  Get,
  Param,
  Req,
  Res,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GoogleAuthGuard } from './google-auth.guard';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { Request, Response } from 'express';

@Controller('auth/google')
export class GoogleAuthController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req: Request, @Res() res: Response) {}

  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  getProfile(@Req() req: Request, @Res() res: Response) {
    console.log(0, req.user);
    const { accessToken } = this.jwtAuthService.login(req.user);
    console.log(5, req.user);
    res.cookie('jwt', accessToken);
    return res.redirect('/profile');
  }
}
