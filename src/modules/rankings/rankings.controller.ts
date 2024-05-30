import {ApiBearerAuth, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {UnauthorizedMessage} from "../../shared/error-messages/unauthorized-message";
import {Controller, UseGuards} from "@nestjs/common";
import {JwtGuard} from "../../guards/jwt/jwt.guard";
@ApiTags('rankings')
@ApiBearerAuth('access_token')
@ApiUnauthorizedResponse({ description: 'Unauthorized', type: UnauthorizedMessage })
@UseGuards(JwtGuard)
@Controller('rankings')
export class RankingsController {

    constructor(

    ) {
    }

    // @Get()
    // public getRankedUsers(): Promise<> {
    //
    // }
}