import {
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Matches
} from 'class-validator';

export class CreateUserDto {
  @MinLength(2, { message: 'Username value is too short' })
  @MaxLength(50, { message: 'Username value is too short' })
  username: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: 'Invalid password' })
  password: string;

  @Matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, { message: 'Invalid email' })
  @MinLength(5, { message: 'Email value is too short' })
  email: string;

  @IsString()
  @IsOptional()
  description?: string;
}
