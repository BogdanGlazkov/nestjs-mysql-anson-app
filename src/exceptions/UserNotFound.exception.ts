import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundExcepton extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(msg || 'User not found', status || HttpStatus.BAD_REQUEST);
  }
}
