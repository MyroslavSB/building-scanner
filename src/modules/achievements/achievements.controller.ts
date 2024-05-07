import {AchievementsService} from "./achievements.service";
import {AchievementEntity} from "./achievement.entity";
import {Controller, Get, UseGuards} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {JwtGuard} from "../../guards/jwt/jwt.guard";

@ApiTags('achievements')
@Controller('achievements')
export class AchievementsController {
    constructor(
        private achievementsService: AchievementsService
    ) {
    }

    @UseGuards(JwtGuard)
    @Get()
    public getUsers(): Promise<AchievementEntity[]> {
        return this.achievementsService.getAchievements()
    }
}