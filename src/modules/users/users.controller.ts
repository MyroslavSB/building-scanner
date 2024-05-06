import {UsersService} from "./users.service";
import {UserEntity} from "./user.entity";
import {RegisterUserDto} from "./utils/interfaces/register-user-dto";
import {Body, Controller, Get, Post} from "@nestjs/common";

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {
    }

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        return this.usersService.registerUser(registerUserDto);
    }

    @Get()
    public getUsers(): Promise<UserEntity[]> {
        return this.usersService.getUsers()
    }
}