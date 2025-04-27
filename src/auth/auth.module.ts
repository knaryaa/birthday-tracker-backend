import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule, // .env dosyasından config verilerini okur
        PassportModule.register({ defaultStrategy: 'jwt' }), // Varsayılan kimlik doğrulama stratejisi olarak JWT'yi kullan
        JwtModule.registerAsync({
            imports: [ConfigModule], // Config servisini kullanmak için
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'), // JWT secret key
                signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }, // Token geçerlilik süresi
            }),
        }),
    ],
    providers: [JwtStrategy, JwtAuthGuard], // JwtStrategy ve JwtAuthGuard'ı sağlayıcı olarak tanımlar
    exports: [PassportModule, JwtModule, JwtAuthGuard], // Diğer modüllerin kullanabilmesi için export edilir
})
export class AuthModule {}
