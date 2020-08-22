import { IsString, Length } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  @Length(193, 193, { message: 'Invalid refresh token' })
  refreshToken: string;
}
