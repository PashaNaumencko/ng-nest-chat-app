/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUser } from "../../../user/interfaces/IUser";
import { CreateUserDto } from "../../../user/dto/CreateUserDto";

declare global {
  namespace Express {
    interface User extends IUser, CreateUserDto { }

    interface Request {
      user?: User;
    }
  }
}
