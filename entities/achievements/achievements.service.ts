import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {AchievementEntity} from "./achievement.entity";
import {Repository} from "typeorm";
import {VisitEntity} from "../visits/visit.entity";

@Injectable()
export class AchievementsService {
    constructor(
        @InjectRepository(AchievementEntity)
        private readonly achievementRepo: Repository<AchievementEntity>
    ) {
    }

    public async createAchievement(userId: number, building_name: string, visit_date: string, visit_id: number): Promise<AchievementEntity> {
        const achievement = this.achievementRepo.create({
            title: "First Visit!",
            description: `You visited ${building_name} for the first time!`,
            user: { id: userId },
            obtained_date: visit_date,
            visit: { id: visit_id }
        });


        try {
            return await this.achievementRepo.save(achievement);
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

    public async getVisits(): Promise<AchievementEntity[]> {
        return await this.achievementRepo.find()
    }
}