import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { FriendModule } from './friend/friend.module';
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from "./auth/auth.module";
import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler';
import {APP_GUARD} from "@nestjs/core";

@Module({
  imports: [
      // İstek sınırlama (rate limiting) modülü
      ThrottlerModule.forRoot({
          throttlers: [
          {
              ttl: 60000, // 60 saniye
              limit: 20,  // 1 dakikada maksimum 20 istek
          }
          ],
      }),
      // .env dosyasındaki değişkenleri kullanmak için ConfigModule
      ConfigModule.forRoot({ isGlobal: true }),
      // SQLite veritabanı bağlantısı (otomatik entity senkronizasyonu aktif)
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'birthday-tracker.db',
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Proje içindeki tüm entity dosyaları
        synchronize: true, // Development için tabloları otomatik oluşturur
      }),
      // Modüllerin uygulamaya eklenmesi
      AuthModule,
      UserModule,
      FriendModule,
      
  ],
    providers: [
        {
            provide: APP_GUARD, // Tüm uygulamada geçerli olacak şekilde ThrottlerGuard'ı global olarak ayarla
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}