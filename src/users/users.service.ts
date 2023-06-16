import { Injectable } from '@nestjs/common';
import { User } from 'src/types/User';

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
    return this.users;
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
