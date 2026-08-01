import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authorization = req.headers?.authorization ?? req.headers?.Authorization;
    if (!authorization || typeof authorization !== 'string' || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid authorization header');
    }

    const token = authorization.slice('Bearer '.length);
    const user = await this.authService.validateUserByToken(token);
    req.user = user; // Attach authenticated identity for downstream guards/controllers
    return true;
  }
}

