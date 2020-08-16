import { Controller, UseGuards, Get, Req } from "@nestjs/common";
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from "../services/user.service";
import { IUserResponse } from "../interfaces/IUserResponse";

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('current')
  async getCurrentUser(@Req() req: Request): Promise<IUserResponse> {
    return await this.userService.getById(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  profile(): string {
    return "profile";
  }
}
