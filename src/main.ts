import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {BadRequestException, ValidationPipe} from '@nestjs/common';
import {HttpExceptionFilter} from './common/filters/http-exception.filter';
import {ConfigService} from "@nestjs/config";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {LogInterceptor} from "./common/interceptors/log.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Frontend (React) uygulamasından istek kabul etmek için CORS ayarı
    app.enableCors({
        origin: 'http://localhost:5173', // React frontend'in çalıştığı adres
        credentials: true,               // Cookie veya header ile bilgi taşıyabilmek için
    });
    // Global Exception Filter ekleniyor (standart hata yönetimi)
    app.useGlobalFilters(new HttpExceptionFilter());

    // Global Validation Pipe ayarlanıyor (gelen verileri DTO'ya göre kontrol eder)
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true, // Sadece DTO'da tanımlı alanlara izin ver
        forbidNonWhitelisted: true, // DTO'da olmayan alanlar gelirse hata ver
        transform: true, // Payloadları DTO'ya dönüştür
        exceptionFactory: (errors) => {
            const formattedErrors = errors.map(err => ({
                field: err.property,
                errors: Object.values(err.constraints || {}),
            }));
            return new BadRequestException(formattedErrors); // Validation hatalarını özel formatta döner
        },
    }));
    
    app.useGlobalInterceptors(new LogInterceptor());

    // Swagger (API Dokümantasyon) ayarlanıyor
    const config = new DocumentBuilder()
        .setTitle('Birthday Tracker API')
        .setDescription('Birthday Tracker API documentation')
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'Authorization',
                description: 'Enter JWT token with Bearer prefix',
                in: 'header',
            },
        ) // JWT token gönderimi için
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document); // Swagger UI /api endpointinde yayınlanır
    
    // .env'den port bilgisi alınır, yoksa 3000 kullanılır
    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT') || 3000;
    await app.listen(port, '0.0.0.0'); // Sunucu belirtilen port üzerinden başlatılır
    
}
bootstrap();