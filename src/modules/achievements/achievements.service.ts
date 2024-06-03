import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {AchievementEntity} from "./achievement.entity";
import {Repository} from "typeorm";
import {VisitEntity} from "../visits/visit.entity";
import {UserEntity} from "../users/user.entity";
import {processAchievementEntity} from "../../shared/functions/process-achievement-entity";
import {AchievementDto} from "../../shared/response-models/achievement-dto";

@Injectable()
export class AchievementsService {
    constructor(
        @InjectRepository(AchievementEntity)
        private readonly achievementRepo: Repository<AchievementEntity>
    ) {
    }

    public async createAchievement(user: UserEntity, building_name: string, visit: VisitEntity): Promise<AchievementEntity> {
        const achievement = this.achievementRepo.create({
            title: "First Visit!",
            description: `You visited ${building_name} for the first time!`,
            user,
            obtained_date: visit.visit_date,
            visit
        });

        return await this.achievementRepo.save(achievement);

    }

    public async getUserAchievements(user: UserEntity): Promise<AchievementEntity[]> {
        return await this.achievementRepo.find({
            relations: [
                'visit',
                'visit.user',
                'visit.building',
                'user',
            ],
            where: {
                user: {id: user.id}
            }
        })
    }

    public async deleteVisitsAchievements(visitsIds: number[]): Promise<void> {
        visitsIds.forEach(id => {
            this.achievementRepo.delete({visit: {id}})
        })

        return
    }
}