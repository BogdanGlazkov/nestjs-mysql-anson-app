import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import 'dotenv/config';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import entities from './typeorm';

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env;

@Module({
  imports: [
    CustomersModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_HOST,
      port: Number(DB_PORT),
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: 'anson',
      entities,
      synchronize: true,
    }),
    AuthModule,
    PassportModule.register({ session: true }),
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
