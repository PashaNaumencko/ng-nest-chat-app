import { IUserResponse } from "../../user/interfaces/IUserResponse";

export interface ICreateToken {
  expiresAt: number;
  user: IUserResponse;
}
