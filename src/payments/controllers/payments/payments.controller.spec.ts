import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { Request, Response } from 'express';

describe('PaymentsController', () => {
  let controller: PaymentsController;

  const statusResponseMock = { send: jest.fn((x) => x) };
  const requestMock = { query: {} } as unknown as Request;
  const responseMock = {
    status: jest.fn(() => statusResponseMock),
    send: jest.fn((x) => x),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPayments', () => {
    it('should return status 400', () => {
      controller.getPayments(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(statusResponseMock.send).toHaveBeenCalledWith({
        msg: 'Missing count or page query parameter',
      });
    });
    it('should return status 200 when both params are present', () => {
      requestMock.query = {
        count: '10',
        page: '1',
      };
      controller.getPayments(requestMock, responseMock);
      expect(responseMock.send).toHaveBeenCalledWith(200);
    });
  });
});
