import { RolesEnum } from 'src/enum/roles.enum';

declare module 'express' {
  export interface User {
    _id: string;
    username: string;
    role: RolesEnum;
    email: string;
  }
  export interface Request{
    user: User;
  }
}
