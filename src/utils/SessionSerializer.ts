import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '../typeorm';
import { UsersService } from '../users/users.service';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
  ) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    console.log('Serialize user');
    console.log(user);

    done(null, user);
  }

  async deserializeUser(user: User, done: (err, user: User) => void) {
    console.log('Deserialize user');
    const userDB = await this.usersService.findUserById(user.id);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
