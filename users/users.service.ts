import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {Repository} from "typeorm";
import {ICreateUserBody} from "./utils/interfaces/i-create-user-body";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>
    ) {
    }

    public async createUser(user_body: ICreateUserBody): Promise<UserEntity> {
        const user = this.userRepo.create(user_body)

        return await this.userRepo.save(user)
    }

    public async getUsers(): Promise<UserEntity[]> {
        return await this.userRepo.find()
    }
}