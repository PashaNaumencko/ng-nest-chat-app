import { RefreshToken } from "../db/entities/refresh-token.entity";
import { User } from "../../user/db/entities/user.entity";

export interface IRefreshTokenWithUser extends RefreshToken {
  user: User
}
