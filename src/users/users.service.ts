import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SerializedUser, User } from 'src/types/User';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      username: 'Anson',
      password: 'Anson',
    },
    {
      username: 'Derek',
      password: 'Derek',
    },
    {
      username: 'Stew',
      password: 'Stew',
    },
    {
      username: 'Samantha',
      password: 'Samantha',
    },
  ];

  getUsers() {
    return this.users.map((user) => plainToClass(SerializedUser, user));
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
