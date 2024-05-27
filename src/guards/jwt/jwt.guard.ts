import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {jwtConstants} from "../../shared/utils/constants/jwt-constants";
import {extractTokenFromHeader} from "../../shared/utils/functions/extract-token-from-header";
import {UsersService} from "../../modules/users/users.service";
import {EUnauthorizedResponses} from "../../shared/enums/e-unauthorized-responses";

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const token: string = extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException(EUnauthorizedResponses.UNAUTHORIZED);
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstants.secret
                }
            );

            const userId = payload.sub;
            request.user = await this.usersService.findDtoById(userId)
        } catch (err) {
            // Handle invalid or expired tokens
            throw new UnauthorizedException(EUnauthorizedResponses.UNAUTHORIZED);
        }

        return true;
    }

}
