import {AchievementsService} from "./achievements.service";
import {AchievementEntity} from "./achievement.entity";
import {Controller, Get} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('achievements')
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