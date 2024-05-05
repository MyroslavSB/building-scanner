import {Module} from "@nestjs/common";
import {UserEntity} from "./user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {

}