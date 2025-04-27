import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should register a user and login successfully', async () => {
    const email = `test${Date.now()}@mail.com`; // Her testte unique email
    const password = 'password123';
    const name = 'Test User';

    // Register
    const registerResponse = await request(app.getHttpServer())
        .post('/users/register')
        .send({ email, password, name })
        .expect(201);

    expect(registerResponse.body.status).toBe('success');
    expect(registerResponse.body.data.email).toBe(email);

    // Login
    const loginResponse = await request(app.getHttpServer())
        .post('/users/login')
        .send({ email, password })
        .expect(201);

    expect(loginResponse.body.status).toBe('success');
    expect(loginResponse.body.data).toHaveProperty('access_token');
  });
});
