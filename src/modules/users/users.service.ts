import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {Repository} from "typeorm";
import {RegisterUserDto} from "./utils/dtos/register-user-dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>
    ) {
    }

    public async registerUser(user_body: RegisterUserDto): Promise<UserEntity> {
        const {email, username, password} = user_body;

        const emailExists = await this.userRepo.findOne({where: {email}});
        if (emailExists) {
            throw new HttpException('Email or username is already in use', HttpStatus.BAD_REQUEST);
        }

        const usernameExists = await this.userRepo.findOne({where: {username}});
        if (usernameExists) {
            throw new HttpException('Email or username is already in use', HttpStatus.BAD_REQUEST);
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = this.userRepo.create({
            email,
            username,
            password: hashedPassword,
        });

        try {
            return await this.userRepo.save(newUser);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY' || error.driverError?.code === 'ER_DUP_ENTRY') {
                throw new HttpException('Email or username is already in use', HttpStatus.BAD_REQUEST);
            }

            throw error;
        }
    }

    public async validateUser(email: string, password: string): Promise<UserEntity> {
        const user = await this.userRepo.findOneBy({
            email
        })

        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
        }

        const samePassword: boolean = await bcrypt.compare(password, user.password)

        if (!samePassword) {
            throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
        }

        return user
    }


    public findByUsername(username: string): Promise<UserEntity> {
        return this.userRepo.findOneBy({ username });
    }

    public async findUserById(id: number): Promise<UserEntity> {
        return await this.userRepo.findOne({
            where: {
                id
            },
            relations: ['buildings', 'visits', 'visits.building', 'achievements']
        })
    }
}