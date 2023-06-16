import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Req,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Request, Response } from 'express';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get(':id')
  getCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const customer = this.customersService.findCustomerById(id);
    if (customer) {
      res.send(customer);
    } else {
      res.status(400).send({ message: 'Customer not found' });
    }
  }

  @Get('search/:id')
  searchCustomerById(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customersService.findCustomerById(id);
    if (customer) return customer;
    else throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
  }
}
