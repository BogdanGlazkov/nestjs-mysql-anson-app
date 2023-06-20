import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UsersController E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Creating New Users POST /api/users/create', () => {
    const CREATE_USER_URL = '/users/create';

    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          username: 'Testuser',
          email: 'testuser@test.com',
          password: '12345678',
        })
        .expect(201);
    });

    it('should return 400 when invalid username is provided', () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          username: 'Te',
          email: 'testuser@test.com',
          password: '12345678',
        })
        .expect(400);
    });

    it('should return 400 when invalid password is provided', () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          username: 'Testuser',
          email: 'testuser@test.com',
          password: '12',
        })
        .expect(400);
    });

    it('should return 400 when invalid email is provided', () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          username: 'Testuser',
          email: 'testuser',
          password: '12345678',
        })
        .expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
