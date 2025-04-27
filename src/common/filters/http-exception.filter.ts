import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch() // Tüm exception'ları yakalar
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR; // Default olarak 500 Internal Server Error
        let message = 'Internal server error';

        // Eğer fırlatılan hata bir HttpException ise detaylı bilgi al
        if (exception instanceof HttpException) {
            status = exception.getStatus(); 
            const exceptionResponse = exception.getResponse();
            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse; // Eğer mesaj string ise doğrudan kullan
            } else if (typeof exceptionResponse === 'object' && (exceptionResponse as any).message) {
                message = (exceptionResponse as any).message; // Eğer object ise içindeki message'ı kullan
            }
        }

        // Hata cevabını standart JSON yapısında döndür
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
        });
    }
}
