import {BuildingsService} from "./buildings.service";
import {BuildingEntity} from "./building.entity";
import {CreateBuildingDto} from "./utils/interfaces/create-building-dto";
import {Body, Controller, Get, Post, Put, Patch, Delete, UseGuards, Param, Req} from "@nestjs/common";
import {JwtGuard} from "../../guards/jwt/jwt.guard";
import {RolesGuard} from "../../guards/roles/roles.guard";
import {ApiTags} from "@nestjs/swagger";
import {Roles} from "../../shared/decorators/roles.decorator";
import {EUserRoles} from "../users/utils/enums/e-user-roles";
import {VisitsService} from "../visits/visits.service";

@ApiTags('buildings')
@UseGuards(JwtGuard, RolesGuard)
@Controller('buildings')
export class BuildingsController {
    constructor(
        private buildingsService: BuildingsService,
        private visitsService: VisitsService
    ) {
    }

    @Roles(EUserRoles.ADMIN)
    @Post()
    public createBuilding(@Body() buildingBody: CreateBuildingDto, @Req() req): Promise<BuildingEntity> {
        return this.buildingsService.createBuilding(buildingBody, req.user)
    }

    @Roles(EUserRoles.ADMIN)
    @Patch(':id')
    public updateBuilding(@Param('id') buildingId: number, @Body() buildingBody: CreateBuildingDto) {
        return this.buildingsService.updateBuilding(buildingId, buildingBody)
    }

    @Roles(EUserRoles.ADMIN)
    @Delete(':id')
    public deleteBuilding(@Param('id') buildingId: number) {
        return this.buildingsService.deleteBuilding(buildingId)
    }

    @Get()
    public getBuildings(): Promise<BuildingEntity[]> {
        const visits = this.visitsService.getVisits()
        return this.buildingsService.getBuildings(visits)
    }

    @Get(':id')
    public getBuildingById(@Param('id') buildingId: number): Promise<BuildingEntity> {
        return this.buildingsService.getBuildingById(buildingId)
    }
}