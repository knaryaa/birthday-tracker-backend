import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {ConfigService} from "@nestjs/config";

@Injectable()
// JWT token doğrulamak için Passport stratejisi
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Token'ı Authorization header'dan al
            ignoreExpiration: false, // Token süresi dolduysa reddet
            secretOrKey: configService.get<string>('JWT_SECRET') || "SECRET_KEY", // Token doğrulama için gizli anahtar
        });
    }

    // Token doğrulandıktan sonra çalışır: Request'e user bilgisi ekler
    async validate(payload: any) {
        // payload: JWT token içeriği (sub ve email gibi alanlar)
        return { userId: payload.sub, email: payload.email };
    }
}
