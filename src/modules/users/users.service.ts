import {BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
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
            throw new BadRequestException('Email is already in use');
        }

        const usernameExists = await this.userRepo.findOne({where: {username}});
        if (usernameExists) {
            throw new BadRequestException('Username is already in use');
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
            // Check the error type to see if it is a duplicate entry
            if (error.code === 'ER_DUP_ENTRY' || error.driverError?.code === 'ER_DUP_ENTRY') {
                // You can customize the error message as needed
                throw new HttpException('This email is already registered.', HttpStatus.BAD_REQUEST);
            }
            // Rethrow the error if it's not related to duplicate entry
            throw error;
        }
    }

    public async validateUser(login_field: string, password: string): Promise<UserEntity> {
        const user = await this.userRepo.findOneBy({
            username: login_field
        }) || await this.userRepo.findOneBy({email: login_field})

        const samePassword: boolean = await bcrypt.compare(password, user.password)

        if (!user || !samePassword) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user
    }

    public async getUsers(): Promise<UserEntity[]> {
        return await this.userRepo.find()
    }

    public findByUsername(username: string): Promise<UserEntity> {
        return this.userRepo.findOneBy({ username });
    }

    public findById(id: number): Promise<UserEntity> {
        return this.userRepo.findOneBy({id})
    }
}