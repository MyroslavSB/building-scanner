import {Body, Controller, Post,} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UsersService} from "../users/users.service";
import {UserEntity} from "../users/user.entity";
import {RegisterUserDto} from "../users/utils/dtos/register-user-dto";
import {UserLoginDto} from "../users/utils/dtos/user-login-dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) {
    }

    @Post('login')
    async login(@Body() user_login: UserLoginDto) {
        const user = await this.usersService.validateUser(user_login.email, user_login.password);
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        const registered_user: UserEntity = await this.usersService.registerUser(registerUserDto);

        return this.authService.login(registered_user);
    }

}
