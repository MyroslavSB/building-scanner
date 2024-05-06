import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {jwtConstants} from "../../shared/utils/constants/jwt-constants";
import {extractTokenFromHeader} from "../../shared/utils/functions/extract-token-from-header";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token: string = extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
      );
    } catch (err) {
      // Handle invalid or expired tokens
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true
  }

}
