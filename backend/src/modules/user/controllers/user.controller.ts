import { Controller, UseGuards, Get } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  profile(): string {
    return "profile";
  }
}
