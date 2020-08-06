/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUser } from "../../../user/interfaces/IUser";
import { ICreateUser } from "../../../user/interfaces/ICreateUser";

declare global {
  namespace Express {
    interface User extends IUser, ICreateUser { }

    interface Request {
      user?: User;
    }
  }
}
