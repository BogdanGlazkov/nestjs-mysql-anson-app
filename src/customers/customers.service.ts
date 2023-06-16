import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
  findCustomer() {
    return {
      id: 1,
      email: 'daniel@test.com',
      createdAt: new Date(),
    };
  }
}
