import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class Users {

  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ nullable: true, name: 'code' }) code: string;
  @Column({ name: 'type' }) type: string;
  @Column({ name: 'level', default: 4 }) level: number;
  @Column({ unique: true, name: 'username' }) username: string;
  @Column({ name: 'password', nullable: true }) password: string;
  @Column({ name: 'titlename_id', nullable: true }) titlenameId: number;
  @Column({ name: 'firstname_th' }) firstnameTH: string;
  @Column({ nullable: true, name: 'firstname_en' }) firstnameEN: string;
  @Column({ nullable: true, name: 'firstname_cn' }) firstnameCN: string;
  @Column({ nullable: true, name: 'lastname_th' }) lastnameTH: string;
  @Column({ nullable: true, name: 'lastname_en' }) lastnameEN: string;
  @Column({ nullable: true, name: 'lastname_cn' }) lastnameCN: string;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @Column({ name: 'is_delete', default: false }) isDelete: boolean;
  @Column({ name: 'create_by', default: 1 }) createBy: number;
  @Column({ name: 'modify_by', default: 1 }) modifyBy: number;
  @CreateDateColumn({ name: 'create_at' }) createAt: Date;
  @UpdateDateColumn({ name: 'modify_at', update: false }) modifyAt: Date;

}