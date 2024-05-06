import {CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../../modules/users/users.service";
import {JwtService} from "@nestjs/jwt";
import {EUserRoles} from "../../modules/users/utils/enums/e-user-roles";
import {Reflector} from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
      private readonly reflector: Reflector,
      private readonly jwtService: JwtService,
      private readonly usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the roles specified in the decorator
    const requiredRoles: EUserRoles[] = this.reflector.getAllAndOverride<EUserRoles[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no specific roles are required, grant access
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    // Check for "Bearer " token in Authorization header
    if (!authHeader || !authHeader.startsWith('JWT ')) {
      throw new UnauthorizedException('Authorization header missing or malformed');
    }

    // Extract the token from the header
    const token = authHeader.substring(7);

    try {
      // Verify and decode the token
      const payload = this.jwtService.verify(token);
      const userId = payload.sub;

      // Fetch the user from the database
      const user = await this.usersService.findById(userId);

      // Attach the user to the request object for further use
      request.user = user;

      // Check if the user has any of the required roles
      if (!requiredRoles.includes(user.role)) {
        throw new ForbiddenException('Access denied: insufficient permissions');
      }

      return true;

    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
