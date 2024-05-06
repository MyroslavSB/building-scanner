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

    @Get()
    public getUsers(): Promise<UserEntity[]> {
        return this.usersService.getUsers()
    }
}