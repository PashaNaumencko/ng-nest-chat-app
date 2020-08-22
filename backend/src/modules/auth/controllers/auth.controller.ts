import { Controller, Post, Req, UseGuards, Body } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from "../services/auth.service";
import { Request } from "express";
import { IAuth } from "../interfaces/IAuth";
import { CreateUserDto } from "../.././user/dto/CreateUserDto";
import { RefreshTokenDto } from '../dto/RefreshTokenDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('login'))
  @Post('login')
  async login(@Req() req: Request): Promise<IAuth> {
    return await this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('register'))
  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<IAuth> {
    return await this.authService.register(body);
  }

  @Post('tokens')
  async refreshTokens(@Body() body: RefreshTokenDto): Promise<IAuth> {
    return await this.authService.refreshTokens(body.refreshToken);
  }

  @Post('tokens/revoke')
  async revokeToken(@Body() body: RefreshTokenDto): Promise<RefreshTokenDto> {
    return await this.authService.revokeToken(body.refreshToken);
  }
}
