import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEditorDTO } from 'src/shared/dto/editor.dto';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { UserInterfaces } from './interfaces/user.interface';

@Injectable()
export class UserService extends HelperService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepositories: Repository<UserEntity>,
  ) {
    super();
  }

  async validateUser(username: string) {
    const users = await this.userRepositories.createQueryBuilder("A")
      .where("A.username = :username", { username })
      .getOne();

    if (!users) {
      throw new HttpException(`user.find.isnull`, HttpStatus.BAD_REQUEST);
    }

    return users;
  }

  async findUserOne(username: string) {
    const users = await this.userRepositories.createQueryBuilder("A")
      .where("A.username = :username", { username })
      .getOne();

    if (!users) {
      throw new HttpException(`user.find.isnull`, HttpStatus.BAD_REQUEST);
    }

    return users.toResponseObject();
  }

  async register(data: CreateUserDTO) {
    try {
      // Logger.log(data)
      // return await this.userRepositories.createUser(data, "AM", {
      //   createBy: 1,
      //   createAt: new Date(this.dateNow()),
      //   modifyBy: 1,
      //   modifyAt: new Date(this.dateNow())
      // });
    } catch (error) {
      throw new HttpException(`user.register: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  public async createUser(createUserDto: CreateUserDTO, type: string = "US"): Promise<UserInterfaces> {
    try {
      Logger.log(createUserDto, "createUserDto");
      const {
        username, password, firstNameTH, lastNameTH, firstNameEN, lastNameEN,
      } = await createUserDto;

      const { createAt, modifyAt } = new CreateEditorDTO();

      const users = new UserEntity();
      users.type = type;
      users.username = username;
      users.password = password;
      users.firstNameTH = firstNameTH;
      users.firstNameEN = firstNameEN;
      users.lastNameTH = lastNameTH;
      users.lastNameEN = lastNameEN;
      users.createBy = 1;
      users.createAt = createAt;
      users.modifyBy = 1;
      users.modifyAt = modifyAt;

      const created = await this.userRepositories.create(users);
      await this.userRepositories.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`user.create: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  // Create User
  async createData(payloadId: number, data: CreateUserDTO) {
    try {
      const createAt = this.dateNow();
      const created = await this.userRepositories.create({
        ...data,
        createBy: payloadId,
        modifyBy: payloadId,
        createAt,
        modifyAt: createAt
      });
      await this.userRepositories.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`user.create: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
