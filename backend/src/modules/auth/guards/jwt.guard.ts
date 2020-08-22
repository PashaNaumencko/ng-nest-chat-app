import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IPayload } from '../interfaces/IPayload';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    return super.canActivate(context) as boolean | Promise<boolean>;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  handleRequest<IPayload>(error: any, user: any): IPayload {
    if (error || !user) {
      throw new UnauthorizedException('Expired access token');
    }
    return user;
  }
}
