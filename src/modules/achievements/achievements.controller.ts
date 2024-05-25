import {AchievementsService} from "./achievements.service";
import {AchievementEntity} from "./achievement.entity";
import {Controller, Get, UseGuards} from "@nestjs/common";
import {ApiForbiddenResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {JwtGuard} from "../../guards/jwt/jwt.guard";
import {UnauthorizedResponse} from "../../shared/responses/unauthorized-response";
import {ForbiddenResponse} from "../../shared/responses/forbidden-response";

@ApiTags('achievements')
@ApiUnauthorizedResponse({ description: 'Unauthorized', type: UnauthorizedResponse })
@ApiForbiddenResponse({description: 'Unauthorized', type: ForbiddenResponse})
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