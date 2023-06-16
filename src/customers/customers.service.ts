import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dtos/CreateCustomer.dto';
import { Customer } from 'src/types/Customer';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    { id: 1, name: 'Daniel Daniel', email: 'daniel@test.com' },
    { id: 2, name: 'Adam Adam', email: 'adam@test.com' },
    { id: 3, name: 'Spencer Spencer', email: 'spencer@test.com' },
  ];

  getCustomers() {
    return this.customers;
  }

  findCustomerById(id: number) {
    return this.customers.find((user) => user.id === id);
  }

  createCustomer(customerDto: CreateCustomerDto) {
    this.customers.push(customerDto);
  }
}
