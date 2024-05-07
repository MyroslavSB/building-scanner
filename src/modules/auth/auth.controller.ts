import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UsersService} from "../users/users.service";
import {AuthGuard} from "@nestjs/passport";
import {UserEntity} from "../users/user.entity";
import {RegisterUserDto} from "../users/utils/dtos/register-user-dto";
import {UserLoginDto} from "../users/utils/dtos/user-login-dto";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) {
    }

    @Post('login')
    async login(@Body() user_login: UserLoginDto) {
        const user = await this.usersService.validateUser(user_login.username, user_login.password);
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        return this.usersService.registerUser(registerUserDto);
    }

}
