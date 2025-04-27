import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const now = Date.now();

        const ip = request.ip === '::1' ? 'localhost' : request.ip;
        const method = request.method;
        const url = request.originalUrl;
        const userId = request.user?.userId || '-';

        console.log(`[${new Date().toISOString()}] [${ip}] [User: ${userId}] ${method} ${url}`);

        return next.handle().pipe(
            tap(() => {
                const responseTime = Date.now() - now;
                console.log(`--> Response Time: ${responseTime}ms`);
            }),
        );
    }
}
