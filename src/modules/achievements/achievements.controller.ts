import {AchievementsService} from "./achievements.service";
import {AchievementEntity} from "./achievement.entity";
import {Controller, Get, UseGuards} from "@nestjs/common";
import {ApiForbiddenResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {JwtGuard} from "../../guards/jwt/jwt.guard";
import {UnauthorizedMessage} from "../../shared/error-messages/unauthorized-message";
import {ForbiddenMessage} from "../../shared/error-messages/forbidden-message";

@ApiTags('achievements')
@ApiUnauthorizedResponse({ description: 'Unauthorized', type: UnauthorizedMessage })
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