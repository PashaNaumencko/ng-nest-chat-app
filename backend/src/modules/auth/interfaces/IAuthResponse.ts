import { IUserResponse } from "../../user/interfaces/IUserResponse";

export interface IAuthResponse {
  user: IUserResponse;
  accessToken: string;
  refreshToken: string;
}
