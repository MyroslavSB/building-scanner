import {Injectable, Scope} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {UserEntity} from "../users/user.entity";
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService
    ) {
    }

    async login(user: UserEntity) {
        const payload = {username: user.username, sub: user.id};
        return {
            access_token: 'this.jwtService.sign(payload)',
        };
    }

    async validateUser(payload: any): Promise<UserEntity> {
        return this.userService.findByUsername(payload.username);
    }

}