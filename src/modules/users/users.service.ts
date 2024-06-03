import {BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {Repository} from "typeorm";
import {RegisterUserDto} from "./utils/dtos/register-user-dto";
import * as bcrypt from 'bcrypt';
import {UserDto} from "../../shared/response-models/user-dto";
import {processUserEntity} from "../../shared/functions/process-user-entity";
import {EUserRoles} from "./utils/enums/e-user-roles";
import {PromoteUserDto} from "./utils/dtos/promote-user-dto";

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
        return this.userRepo.findOneBy({username});
    }

    public async findUserById(id: number): Promise<UserEntity> {
        return await this.userRepo.findOne({
            where: {
                id
            },
            relations: ['buildings', 'visits', 'visits.building', 'achievements']
        })
    }

    public async findUserDtoById(id: number): Promise<UserDto> {
        return processUserEntity(await this.userRepo.findOne({
            where: {
                id
            },
            relations: ['buildings', 'visits', 'visits.building', 'achievements']
        }))
    }

    public async getRankings(sortBy: { sortBy: 'visits' } | { sortBy: 'achievements' }): Promise<UserDto[]> {

        const queryBuilder = this.userRepo.createQueryBuilder('user')
            .leftJoinAndSelect('user.visits', 'visits')
            .leftJoinAndSelect('user.achievements', 'achievements')
            .leftJoinAndSelect('user.buildings', 'buildings');

        queryBuilder.addSelect(subQuery => {
            return subQuery
                .select('COUNT(visits.id)', 'visitCount')
                .from('visit', 'visits')
                .where('visits.user_id = user.id');
        }, 'visitCount');

        queryBuilder.addSelect(subQuery => {
            return subQuery
                .select('COUNT(achievements.id)', 'achievementCount')
                .from('achievement', 'achievements')
                .where('achievements.user_id = user.id');
        }, 'achievementCount');

        // Apply ordering based on the sortBy parameter
        if (sortBy.sortBy === 'visits') {
            queryBuilder.orderBy('visitCount', 'DESC');
        } else if (sortBy.sortBy === 'achievements') {
            queryBuilder.orderBy('achievementCount', 'DESC');
        } else {
            throw new BadRequestException('Invalid sorting criteria');
        }

        const users = await queryBuilder.getMany();

        return users.map(user => processUserEntity(user));
    }

    public async promoteUser(promoteUserDto: PromoteUserDto, currentUser: UserEntity): Promise<UserDto> {
        if (currentUser.role !== EUserRoles.ADMIN) {
            throw new BadRequestException('Only admins can promote users to admin');
        }

        const { userId } = promoteUserDto;
        const user = await this.findUserById(userId)

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.role === EUserRoles.ADMIN) {
            throw new BadRequestException('User is already an admin');
        }

        user.role = EUserRoles.ADMIN;
        return processUserEntity(await this.userRepo.save(user));
    }
}