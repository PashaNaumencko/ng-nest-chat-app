import { Controller, UseGuards, Get, Req, Param } from "@nestjs/common";
import { Request } from 'express';
import { UserService } from "../services/user.service";
import { IUserResponse } from "../interfaces/IUserResponse";
import { JwtAuthGuard } from '../../auth/guards/jwt.guard'
import { IValidateResponse } from "../interfaces/IValidateResponse";

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('current')
  getCurrentUser(@Req() req: Request): Promise<IUserResponse> {
    return this.userService.getById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(): string {
    return "profile";
  }

  @Get('/check-username/:username')
  checkUsername(@Param('username') username: string): Promise<IValidateResponse> {
    return this.userService.isUsernameAlreadyTaken(username);
  }

  @Get('/check-email/:email')
  checkEmail(@Param('email') email: string): Promise<IValidateResponse> {
    return this.userService.isEmailAlreadyTaken(email);
  }
}
