import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCustomerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    console.log('ValidateCustomerMiddleware');

    if (!authorization)
      res.status(403).send({ error: 'No authentication token provided' });

    if (authorization === '123') next();
    else res.status(403).send({ error: 'Invalid authentication token' });
  }
}
