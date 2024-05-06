import {Module} from "@nestjs/common";
import {UserEntity} from "./user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {BuildingsService} from "../buldings/buildings.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {

}