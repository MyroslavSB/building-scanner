import {VisitsService} from "./visits.service";
import {VisitEntity} from "./visit.entity";
import {VisitBuildingDto} from "./utils/interfaces/visit-building-dto";
import {Body, Controller, Get, Post, Req, UseGuards} from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {JwtGuard} from "../../guards/jwt/jwt.guard";
import {BadVisitResponse} from "./utils/responses/bad-visit-response";
import {UnauthorizedMessage} from "../../shared/error-messages/unauthorized-message";
import {ForbiddenMessage} from "../../shared/error-messages/forbidden-message";
import {RolesGuard} from "../../guards/roles/roles.guard";
import {Roles} from "../../shared/decorators/roles.decorator";
import {EUserRoles} from "../users/utils/enums/e-user-roles";

@ApiTags('visits')
@ApiBearerAuth('access_token')
@Controller('visits')
@ApiUnauthorizedResponse({ description: 'Unauthorized', type: UnauthorizedMessage })
@UseGuards(JwtGuard, RolesGuard)
export class VisitsController {
    constructor(
        private visitsService: VisitsService
    ) {
    }

    @ApiBadRequestResponse({
        description: 'Bad Request',
        type: BadVisitResponse,
    })
    @ApiForbiddenResponse({
        description: 'Forbidden',
        type: ForbiddenMessage
    })
    @Roles(EUserRoles.USER)
    @Post()
    public makeVisit(@Body() visitBuildingDto: VisitBuildingDto, @Req() req): Promise<VisitEntity> {
        return this.visitsService.createVisit(visitBuildingDto, req.user.id)
    }

    @Get()
    public getVisits(): Promise<VisitEntity[]> {
        return this.visitsService.getVisits()
    }
}