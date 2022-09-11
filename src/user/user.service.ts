import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { Users } from './entities/user.entity';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService extends HelperService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepositoties: Repository<Users>
  ) {
    super();
  }

  async findUserOne(username: string, password: string) {
    const users = await this.userRepositoties.createQueryBuilder("A")
      .where("A.username = :username", { username })
      .getOne();

    if (users) {
      throw new HttpException(`user.find.isnull`, HttpStatus.BAD_REQUEST);
    }

    return users;
  }

  async register(data: UserDTO) {
    try {
      const items = await this.userRepositoties.create(data);
      await this.userRepositoties.save(items);
      return items.toResponseObject();
    } catch (error) {
      throw new HttpException(`user.register: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  // Create User
  async createData(payloadId: number, data: UserDTO) {
    try {
      const createAt = this.dateNow();
      const created = await this.userRepositoties.create({
        ...data,
        createBy: payloadId,
        modifyBy: payloadId,
        createAt,
        modifyAt: createAt
      });
      await this.userRepositoties.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`user.create: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
