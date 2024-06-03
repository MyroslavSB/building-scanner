import {Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards,} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UsersService} from "../users/users.service";
import {UserEntity} from "../users/user.entity";
import {RegisterUserDto} from "../users/utils/dtos/register-user-dto";
import {UserLoginDto} from "../users/utils/dtos/user-login-dto";
import {ApiBadRequestResponse, ApiBearerAuth, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {BadLoginResponse} from "./utils/responses/bad-login-response";
import {BadRegisterResponse} from "./utils/responses/bad-register-response";
import {JwtGuard} from "../../guards/jwt/jwt.guard";
import {UserDto} from "../../shared/response-models/user-dto";
import {UnauthorizedMessage} from "../../shared/error-messages/unauthorized-message";
import {Roles} from "../../shared/decorators/roles.decorator";
import {EUserRoles} from "../users/utils/enums/e-user-roles";
import {RolesGuard} from "../../guards/roles/roles.guard";
import {PromoteUserDto} from "../users/utils/dtos/promote-user-dto";

@ApiTags('auth')
@ApiBearerAuth('access_token')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) {
    }

    @ApiBadRequestResponse({
        description: 'Bad Request',
        type: BadLoginResponse,
    })
    @Post('login')
    public async login(@Body() user_login: UserLoginDto) {
        const user = await this.usersService.validateUser(user_login.email, user_login.password);
        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST)
        }
        return this.authService.login(user)
    }

    @ApiBadRequestResponse({
        description: 'Bad Request',
        type: BadRegisterResponse,
    })
    @Post('register')
    public async register(@Body() registerUserDto: RegisterUserDto) {
        const registered_user: UserEntity = await this.usersService.registerUser(registerUserDto);

        return this.authService.login(registered_user);
    }


    @ApiUnauthorizedResponse({description: 'Unauthorized', type: UnauthorizedMessage})
    @UseGuards(JwtGuard)
    @Get('self')
    public async getSelf(@Req() req): Promise<UserDto> {
        return this.usersService.findUserDtoById(req.user.id)
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(EUserRoles.ADMIN)
    @Post('promote')
    public promoteUser(@Body() makeAdminDto: PromoteUserDto, @Req() req): Promise<UserDto> {
        return this.usersService.promoteUser(makeAdminDto, req.user)
    }
}

