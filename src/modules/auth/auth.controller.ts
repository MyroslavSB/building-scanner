import {Body, Controller, HttpException, HttpStatus, Post,} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UsersService} from "../users/users.service";
import {UserEntity} from "../users/user.entity";
import {RegisterUserDto} from "../users/utils/dtos/register-user-dto";
import {UserLoginDto} from "../users/utils/dtos/user-login-dto";
import {ApiBadRequestResponse, ApiPreconditionFailedResponse, ApiTags} from "@nestjs/swagger";
import {BadLoginResponse} from "./utils/responses/bad-login-response";
import {BadRegisterResponse, BadRegisterUsernameResponse} from "./utils/responses/bad-register-response";

@ApiTags('auth')
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
    async login(@Body() user_login: UserLoginDto) {
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
    async register(@Body() registerUserDto: RegisterUserDto) {
        const registered_user: UserEntity = await this.usersService.registerUser(registerUserDto);

        return this.authService.login(registered_user);
    }

}
