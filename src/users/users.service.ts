import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SerializedUser, User } from 'src/types/User';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, username: 'Anson', password: 'Anson' },
    { id: 2, username: 'Derek', password: 'Derek' },
    { id: 3, username: 'Stew', password: 'Stew' },
    { id: 4, username: 'Samantha', password: 'Samantha' },
  ];

  getUsers() {
    return this.users.map((user) => plainToClass(SerializedUser, user));
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
