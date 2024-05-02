import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
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

        try {
            return await this.userRepo.save(user);
        } catch (error) {
            // Check the error type to see if it is a duplicate entry
            if (error.code === 'ER_DUP_ENTRY' || error.driverError?.code === 'ER_DUP_ENTRY') {
                // You can customize the error message as needed
                throw new HttpException('This email is already registered.', HttpStatus.BAD_REQUEST);
            }
            // Rethrow the error if it's not related to duplicate entry
            throw error;
        }
    }

    public async getUsers(): Promise<UserEntity[]> {
        return await this.userRepo.find()
    }
}