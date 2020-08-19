import { UserDTO } from './UserDTO';

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user?: UserDTO;
}
