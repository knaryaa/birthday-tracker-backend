import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Giriş yapmış kullanıcının bilgilerini request'ten alıp controller metodlarına kolayca geçiren custom decorator
export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user; // JwtStrategy tarafından eklenen user bilgisini döner
    },
);