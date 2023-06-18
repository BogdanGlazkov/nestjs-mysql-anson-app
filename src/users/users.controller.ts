import {
  Controller,
  Get,
  Inject,
  Param,
  HttpException,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
  UseFilters,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SerializedUser } from 'src/types/User';
import { UserNotFoundExcepton } from 'src/exceptions/UserNotFound.exception';
import { HttpExceptionFilter } from 'src/filters/HttpException.filter';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: UsersService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/username/:username')
  getByUsername(@Param('username') username: string) {
    const user = this.usersService.getUserByUsername(username);
    if (user) return new SerializedUser(user);
    else throw new HttpException('UserNotFound', HttpStatus.BAD_REQUEST);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(HttpExceptionFilter)
  @Get('/id/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.getUserById(id);
    if (user) return new SerializedUser(user);
    else throw new UserNotFoundExcepton();
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
