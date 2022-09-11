export interface User {
  id: number;
  code: string;
  type: string;
  level: number;
  username: string;
  firstNameTH: string;
  lastNameTH: string;
  firstNameEN: string;
  lastNameEN: string;
  email: string;
  phoneNo: string;
  mobileNo: string;
  isActive: boolean;
  isDelete: boolean;
  createBy: number;
  modifyBy: number;
  createAt: Date;
  modifyAt: Date;
  accessToken: string;
}
