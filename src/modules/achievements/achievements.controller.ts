import {AchievementsService} from "./achievements.service";
import {Controller, Get, Req, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {JwtGuard} from "../../guards/jwt/jwt.guard";
import {UnauthorizedMessage} from "../../shared/error-messages/unauthorized-message";
import {AchievementDto} from "../../shared/response-models/achievement-dto";

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
    public getUserAchievements(@Req() req): Promise<AchievementDto[]> {
        return this.achievementsService.getUserAchievements(req.user)
    }
}