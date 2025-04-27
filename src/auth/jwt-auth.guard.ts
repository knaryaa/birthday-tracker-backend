import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// JWT doğrulaması yapan Guard
export class JwtAuthGuard extends AuthGuard('jwt') {}
// Passport stratejisi olarak 'jwt' kullanır ve otomatik doğrulama yapar
