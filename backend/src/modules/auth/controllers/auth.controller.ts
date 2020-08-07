import { Controller, Post, Req, UseGuards, Body } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from "../services/auth.service";
import { Request } from "express";
import { IAuthResponse } from "../interfaces/IAuthResponse";
import { CreateUserDto } from "../.././user/dto/CreateUserDto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('login'))
  @Post('login')
  async login(@Req() req: Request): Promise<IAuthResponse> {
    return await this.authService.login(req.user.id)
  }

  @UseGuards(AuthGuard('register'))
  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<IAuthResponse> {
    return await this.authService.register(body);
  }
}
