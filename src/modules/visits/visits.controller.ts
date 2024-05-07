import {VisitsService} from "./visits.service";
import {VisitEntity} from "./visit.entity";
import {ICreateVisitBody} from "./utils/interfaces/i-create-visit-body";
import {Body, Controller, Get, Post} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('visits')
@Controller('visits')
export class VisitsController {
    constructor(
        private visitsService: VisitsService
    ) {
    }

    @Post()
    public makeVisit(@Body() buildingBody: ICreateVisitBody): Promise<VisitEntity> {
        return this.visitsService.createVisit(buildingBody, 1)
    }

    @Get()
    public getVisits(): Promise<VisitEntity[]> {
        return this.visitsService.getVisits()
    }
}