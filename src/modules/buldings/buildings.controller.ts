import {BuildingsService} from "./buildings.service";
import {BuildingEntity} from "./building.entity";
import {ICreateBuildingBody} from "./utils/interfaces/i-create-building-body";
import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

@Controller('buildings')
export class BuildingsController {
    constructor(
        private usersService: BuildingsService
    ) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    public createBuilding(@Body() buildingBody: ICreateBuildingBody): Promise<BuildingEntity> {
        return this.usersService.createBuilding(buildingBody)
    }

    @Get()
    public getBuildings(): Promise<BuildingEntity[]> {
        return this.usersService.getBuildings()
    }
}