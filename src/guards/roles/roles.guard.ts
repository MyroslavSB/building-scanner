import {CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {EUserRoles} from "../../modules/users/utils/enums/e-user-roles";
import {Reflector} from "@nestjs/core";
import {extractTokenFromHeader} from "../../shared/utils/functions/extract-token-from-header";
import {jwtConstants} from "../../shared/utils/constants/jwt-constants";
import {ROLES_KEY} from "../../shared/decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Get the roles specified in the decorator
        const requiredRoles: EUserRoles[] = this.reflector.getAllAndOverride<EUserRoles[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // If no specific roles are required, grant access
        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        const token: string = extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('No token RolesGuard');
        }

        const user = request.user

        if (!request.user) {
            throw new UnauthorizedException('No User in request body: RolesGuard');
        }

        if (!requiredRoles.includes(user.role)) {
            throw new UnauthorizedException('Access denied: insufficient permissions');

        }

        return true;


    }
}
