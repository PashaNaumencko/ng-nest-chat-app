import { Controller, UseGuards, Get, Req } from "@nestjs/common";
import { Request } from 'express';
import { UserService } from "../services/user.service";
import { IUserResponse } from "../interfaces/IUserResponse";
import { JwtAuthGuard } from '../../auth/guards/jwt.guard'

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
}
