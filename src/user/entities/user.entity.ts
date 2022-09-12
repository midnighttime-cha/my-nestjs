import { HelperService } from 'src/shared/helpers/helper.service';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, BeforeInsert, getManager } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import fs = require("fs");
import * as jwt from 'jsonwebtoken';
import { UserInterfaces } from '../interfaces/user.interface';
import { Logger } from '@nestjs/common';

@Entity({ name: 'users' })
export class UserEntity extends HelperService {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn({ name: "id", type: "int4" }) id: number;
  @Column({ name: "code", type: "varchar", length: 25 }) code: string;
  @Column({ name: "type", type: "varchar", length: 5, enum: ["DV", "SA", "AM", "US"], default: "DV" }) type: string;
  @Column({ name: "level", type: "int4", enum: [1, 2, 3, 4], default: 1 }) level: number;
  @Column({ name: "username", type: "varchar", length: 100 }) username: string;
  @Column({ name: "password", type: "varchar", length: 400 }) password: string;
  @Column({ name: "firstname_th", type: "varchar", length: 255 }) firstNameTH: string;
  @Column({ name: "firstname_en", type: "varchar", length: 255 }) firstNameEN: string;
  @Column({ name: "lastname_th", type: "varchar", length: 255, nullable: true }) lastNameTH: string;
  @Column({ name: "lastname_en", type: "varchar", length: 255, nullable: true }) lastNameEN: string;
  @Column({ name: "email", type: "varchar", length: 255, nullable: true }) email: string;
  @Column({ name: "phone_no", type: "varchar", length: 25, nullable: true }) phoneNo: string;
  @Column({ name: "mobile_no", type: "varchar", length: 25, nullable: true }) mobileNo: string;
  @Column({ name: "is_active", default: true }) isActive: boolean;
  @Column({ name: "is_delete", default: false }) isDelete: boolean;
  @Column({ name: "create_by", type: "int4" }) createBy: number;
  @Column({ name: "modify_by", type: "int4" }) modifyBy: number;
  @CreateDateColumn({ name: "create_at", type: "timestamptz" }) createAt: Date;
  @UpdateDateColumn({ name: "modify_at", type: "timestamptz" }) modifyAt: Date;

  @BeforeInsert()
  async hashPassword() {
    const date = this.dateFormat('YYMM');
    const type = (typeof this.type !== "undefined" ? this.type : "US");
    const countUser = await getManager('default').getRepository(UserEntity).createQueryBuilder("A").where("A.type = :type", { type }).getCount();

    this.code = `${type}${date}${`${(countUser + 1)}`.padStart(4, '0')}`;
    this.password = await bcrypt.hash(this.password.trim(), 10);

    switch (this.type) {
      case "DV": this.level = 1; break;
      case "SA": this.level = 2; break;
      case "AM": this.level = 3; break;
      case "US": this.level = 4; break;
      default: this.level = 4; break;
    }
  }

  private get accessToken() {
    // PAYLOAD
    const { id, email, code, username, type, level } = this;

    // PRIVATE key
    const privateKEY = fs.readFileSync(`./key/private`, 'utf8');

    // const accessToken = jwt.sign({ id, email, code, username, type, level }, privateKEY, {
    //   issuer: `${process.env.APP_ISSUER}`,
    //   subject: `${process.env.APP_SUBJECT}`,
    //   audience: `${process.env.APP_AUDIENCE}`,
    //   expiresIn: "7d",
    //   algorithm: "RS256"
    // });
    const accessToken = jwt.sign({ id, email, code, username, type, level }, process.env.APP_SECRET);
    return accessToken;
  }

  async comparePassword(text: string) {
    return await bcrypt.compare(text, this.password);
  }

  toResponseObject(lang: string = "", showPassword: boolean = false, showToken: boolean = false): Promise<UserInterfaces | undefined> {
    const {
      id, code, type, level, username, password, firstNameTH, lastNameTH, firstNameEN, lastNameEN, email, phoneNo,
      mobileNo, isActive, isDelete, createBy, modifyBy, createAt, modifyAt, accessToken
    } = this;

    const responseObject: any = { id, code, type, level, username };

    if (showPassword) {
      Object.assign(responseObject, {
        password
      });
    }

    if (lang !== "") {
      Object.assign(responseObject, {
        firstName: this[`firstName${lang}`],
        lastName: this[`lastName${lang}`]
      });
    } else {
      Object.assign(responseObject, {
        firstNameTH, lastNameTH, firstNameEN, lastNameEN, email, phoneNo, mobileNo, isActive, isDelete, createBy, modifyBy, createAt, modifyAt
      });
    }

    if (showToken) {
      Object.assign(responseObject, {
        accessToken
      });
    }

    return responseObject;
  }
}