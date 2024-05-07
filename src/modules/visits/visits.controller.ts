import {VisitsService} from "./visits.service";
import {VisitEntity} from "./visit.entity";
import {VisitBuildingDto} from "./utils/interfaces/visit-building-dto";
import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {JwtGuard} from "../../guards/jwt/jwt.guard";

@ApiTags('visits')
@Controller('visits')
export class VisitsController {
    constructor(
        private visitsService: VisitsService
    ) {
    }

    @UseGuards(JwtGuard)
    @Post()
    public makeVisit(@Body() visitBuildingDto: VisitBuildingDto): Promise<VisitEntity> {
        return this.visitsService.createVisit(visitBuildingDto, 1)
    }

    @UseGuards(JwtGuard)
    @Get()
    public getVisits(): Promise<VisitEntity[]> {
        return this.visitsService.getVisits()
    }
}