import {VisitsService} from "./visits.service";
import {VisitEntity} from "./visit.entity";
import {VisitBuildingDto} from "./utils/interfaces/visit-building-dto";
import {Body, Controller, Get, Post, Req, UseGuards} from "@nestjs/common";
import {ApiBadRequestResponse, ApiBearerAuth, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {JwtGuard} from "../../guards/jwt/jwt.guard";
import {BadVisitResponse} from "./utils/responses/bad-visit-response";

@ApiTags('visits')
@ApiBearerAuth('access_token')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@Controller('visits')
export class VisitsController {
    constructor(
        private visitsService: VisitsService
    ) {
    }

    @ApiBadRequestResponse({
        description: 'Bad Request',
        type: BadVisitResponse,
    })
    @UseGuards(JwtGuard)
    @Post()
    public makeVisit(@Body() visitBuildingDto: VisitBuildingDto, @Req() req): Promise<VisitEntity> {
        return this.visitsService.createVisit(visitBuildingDto, req.user.id)
    }

    @UseGuards(JwtGuard)
    @Get()
    public getVisits(): Promise<VisitEntity[]> {
        return this.visitsService.getVisits()
    }
}