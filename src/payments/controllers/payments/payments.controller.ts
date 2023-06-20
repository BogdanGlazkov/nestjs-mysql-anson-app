import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreatePaymentDto } from 'src/payments/dto/CreatePayment.dto';
import { PaymentsService } from 'src/payments/services/payments/payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    @Inject('PAYMENTS_SERVICE')
    private readonly paymentsService: PaymentsService,
  ) {}

  @Get()
  getPayments(@Req() req: Request, @Res() res: Response) {
    const { count, page } = req.query;
    if (!count || !page) {
      res.status(400).send({ msg: 'Missing count or page query parameter' });
    } else {
      res.send(200);
    }
  }

  @Post('create')
  createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    this.paymentsService.createPayment();
  }
}
