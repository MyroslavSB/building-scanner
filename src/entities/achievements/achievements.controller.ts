import {AchievementsService} from "./achievements.service";
import {AchievementEntity} from "./achievement.entity";
import {Controller, Get} from "@nestjs/common";

@Controller('achievements')
export class AchievementsController {
    constructor(
        private achievementsService: AchievementsService
    ) {
    }

    @Get()
    public getUsers(): Promise<AchievementEntity[]> {
        return this.achievementsService.getVisits()
    }
}