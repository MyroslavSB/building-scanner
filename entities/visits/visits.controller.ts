import {VisitsService} from "./visits.service";
import {VisitEntity} from "./visit.entity";
import {ICreateVisitBody} from "./utils/interfaces/i-create-visit-body";
import {Body, Controller, Get, Post} from "@nestjs/common";

@Controller('visits')
export class VisitsController {
    constructor(
        private visitsService: VisitsService
    ) {
    }

    @Post()
    public createUser(@Body() buildingBody: ICreateVisitBody): Promise<VisitEntity> {
        return this.visitsService.createUser(buildingBody, 1)
    }

    @Get()
    public getUsers(): Promise<VisitEntity[]> {
        return this.visitsService.getVisits()
    }
}