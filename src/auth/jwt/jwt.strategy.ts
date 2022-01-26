import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type JwtPayload = { sub: string; name: string; email: string };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const extractJwtFromCookie = (req) => {
      let token = null;
      console.log(1, req.cookies, req.user);
      if (req && req.cookies) {
        token = req.cookies['jwt'];
      }
      console.log(2, token);
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };

    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    console.log(payload);
    return { id: payload.sub, name: payload.name, email: payload.email };
  }
}
