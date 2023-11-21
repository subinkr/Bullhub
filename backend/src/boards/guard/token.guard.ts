import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const checkToken = req.headers['authorization'];
    if (!checkToken) {
      return true;
      // throw new UnauthorizedException('로그인이 필요합니다.');
    }

    const token = this.authService.tokenFormatter(checkToken);
    const result = await this.authService.verifyToken(token);
    const user = await this.usersService.getUsers(result.id);

    req.token = token;
    req.user = user;

    return true;
  }
}
