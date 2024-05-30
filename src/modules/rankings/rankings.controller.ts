import {ApiBearerAuth, ApiQuery, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {UnauthorizedMessage} from "../../shared/error-messages/unauthorized-message";
import {Controller, Get, Query, UseGuards} from "@nestjs/common";
import {JwtGuard} from "../../guards/jwt/jwt.guard";
import {UsersService} from "../users/users.service";
import {UserDto} from "../../shared/response-models/user-dto";

@ApiTags('rankings')
@ApiBearerAuth('access_token')
@ApiUnauthorizedResponse({description: 'Unauthorized', type: UnauthorizedMessage})
@UseGuards(JwtGuard)
@Controller('rankings')
export class RankingsController {
    constructor(
        private usersService: UsersService
    ) {
    }

    @ApiQuery({ name: 'sortBy', enum: ['visits', 'achievements'], required: false, description: 'Criteria to sort by'})
    @Get()
    public getRankedUsers(@Query() ranking_property: { sortBy:'visits' } | { sortBy:'achievements'} = { sortBy: 'visits'}): Promise<UserDto[]> {

        return this.usersService.getRankings(ranking_property)
    }
}