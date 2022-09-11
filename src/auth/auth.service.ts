import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserAuthDTO } from 'src/user/dto/user-auth.dto';
import { User } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';
import bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
  ) { }

  async validateUser(username: string, pass: string): Promise<User | undefined> {
    const userData = await this.usersService.findUserOne(username, pass);

    if (username && (await userData.comparePassword(pass))) {
      return userData.toResponseObject();
    }

    return null;
  }

  async login(data: UserAuthDTO, lang: string = ''): Promise<User> {
    try {
      const userData = await this.usersService.findUserOne(data.username, data.password);

      if (userData || (this.comparePassword(data.password, userData.password))) {

        delete userData.password;

        return userData.toResponseObject();
      }
      return null;
    } catch (error) {
      throw new HttpException(`auth.login: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  private comparePassword(attempt: string, password: string) {
    return bcrypt.compare(attempt, password);
  }
}
