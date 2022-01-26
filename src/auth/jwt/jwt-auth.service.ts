import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class JwtAuthService {
  private readonly logger = new Logger(JwtAuthService.name);

  constructor(private jwtService: JwtService) {}

  login(user: any) {
    console.log(3, user);
    const payload: JwtPayload = {
      name: user.name,
      sub: user.id,
      email: user.email,
    };
    this.logger.log(payload.name);
    this.logger.log(payload.sub);
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
