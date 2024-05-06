import {Module} from "@nestjs/common";
import {UsersModule} from "../users/users.module";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";

@Module({
    imports: [UsersModule],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {

}