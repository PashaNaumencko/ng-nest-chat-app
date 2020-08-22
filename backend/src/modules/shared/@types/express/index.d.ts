/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateUserDto } from "../../../user/dto/CreateUserDto";
import { IUserResponse } from "src/modules/user/interfaces/IUserResponse";

declare global {
  namespace Express {
    interface User extends IUserResponse, CreateUserDto { }

    interface Request {
      user?: User;
    }
  }
}
