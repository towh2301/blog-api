import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // reject expired tokens
            secretOrKey:
                '4b866bb43c3f2bf2c981a5c20eb6bd514540828395ecd2b3f94ed6c60b28dae2', // move to .env in real project
        });
    }

    async validate(payload: any) {
        // payload = { sub: userId, role: userRole, iat, exp }
        return {
            userId: payload.sub,
            email: payload.email,
            role: payload.role,
        };
    }
}
