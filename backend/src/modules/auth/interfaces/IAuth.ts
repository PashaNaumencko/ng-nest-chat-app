import { IUserResponse } from "../../user/interfaces/IUserResponse";

export interface IAuth {
  user?: IUserResponse
  accessToken: string;
  refreshToken: string;
}
