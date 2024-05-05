import {UsersService} from "./users.service";
import {UserEntity} from "./user.entity";
import {ICreateUserBody} from "./utils/interfaces/i-create-user-body";
import {Body, Controller, Get, Post} from "@nestjs/common";

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {
    }

    @Post()
    public createUser(@Body() user_body: ICreateUserBody): Promise<UserEntity> {
        return this.usersService.createUser(user_body)
    }

    @Get()
    public getUsers(): Promise<UserEntity[]> {
        return this.usersService.getUsers()
    }
}