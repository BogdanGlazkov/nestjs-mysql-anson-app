import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';
import { SessionEntity } from '../src/typeorm';

describe('UsersController E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    const sessionRepository = app.get(DataSource).getRepository(SessionEntity);
    app.use(
      session({
        name: 'NESTJS_SESSION_ID',
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 60000,
        },
        store: new TypeormStore().connect(sessionRepository),
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());

    await app.init();
  });

  describe('Authentication', () => {
    const URL = '/api/auth/login';
    it('should login', () => {
      return request(app.getHttpServer())
        .post(URL)
        .send({
          username: 'Testuser',
          password: '12345678',
        })
        .expect(201);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
