import {AchievementsService} from "./achievements.service";
import {AchievementEntity} from "./achievement.entity";
import {Controller, Get, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiForbiddenResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {JwtGuard} from "../../guards/jwt/jwt.guard";
import {UnauthorizedMessage} from "../../shared/error-messages/unauthorized-message";

@ApiTags('achievements')
@ApiBearerAuth('access_token')
@ApiUnauthorizedResponse({ description: 'Unauthorized', type: UnauthorizedMessage })
@UseGuards(JwtGuard)
@Controller('achievements')
export class AchievementsController {
    constructor(
        private achievementsService: AchievementsService
    ) {
    }

    @Get('')
    public getAchievements(): Promise<AchievementEntity[]> {
        return this.achievementsService.getAchievements()
    }
}