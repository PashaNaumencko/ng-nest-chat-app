import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { LoginStrategy } from './strategies/login.strategy';
import { RegisterStrategy } from './strategies/register.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller'
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenRepository } from './db/repositories/refresh-token.repository';
import { RefreshTokenService } from './services/refresh-token.service';
import { SharedModule } from '../shared/shared.module';
@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    SharedModule,
    TypeOrmModule.forFeature([RefreshTokenRepository]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        imports: [ConfigModule],
        secret: configService.get<string>('ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: configService.get<string>('ACCESS_TOKEN_EXPIRES_IN') }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [LoginStrategy, RegisterStrategy, JwtStrategy, AuthService, RefreshTokenService],
  controllers: [AuthController]
})
export class AuthModule {}
