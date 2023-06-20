import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from 'src/payments/services/payments/payments.service';
import { BadRequestException } from '@nestjs/common';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let paymentsService: PaymentsService;

  const statusResponseMock = { send: jest.fn((x) => x) };
  const requestMock = { query: {} } as unknown as Request;
  const responseMock = {
    status: jest.fn(() => statusResponseMock),
    send: jest.fn((x) => x),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: 'PAYMENTS_SERVICE',
          useValue: {
            createPayment: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    paymentsService = module.get<PaymentsService>('PAYMENTS_SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('paymentsService should be defined', () => {
    expect(paymentsService).toBeDefined();
  });

  describe('getPayments', () => {
    it('should return status 400', async () => {
      await controller.getPayments(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(statusResponseMock.send).toHaveBeenCalledWith({
        msg: 'Missing count or page query parameter',
      });
    });
    it('should return status 200 when both params are present', async () => {
      requestMock.query = {
        count: '10',
        page: '1',
      };
      await controller.getPayments(requestMock, responseMock);
      expect(responseMock.send).toHaveBeenCalledWith(200);
    });
  });

  describe('createPayment', () => {
    // it('should return a successful response', async () => {
    //   const response = await controller.createPayment({
    //     email: 'anson@test.com',
    //     price: 100,
    //   });
    //   expect(response).toStrictEqual({ status: 'success' });
    // });

    it('should throw an error', async () => {
      jest
        .spyOn(paymentsService, 'createPayment')
        .mockImplementationOnce(() => {
          throw new BadRequestException();
        });
      try {
        const response = await controller.createPayment({
          email: 'anson@test.com',
          price: 100,
        });
      } catch (error) {
        console.log(error);
      }
    });
  });
});
