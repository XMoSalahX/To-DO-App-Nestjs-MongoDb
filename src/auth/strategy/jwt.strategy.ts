import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ingoreExpiration: false,
      secretOrKey: 'secret32r32r48y383uf3fkwefn389f4ufn4f9i4nbfowqgf3$%',
    });
  }

  async validate(payload: any): Promise<any> {
    return payload;
  }
}
