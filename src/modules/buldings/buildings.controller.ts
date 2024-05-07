import {BuildingsService} from "./buildings.service";
import {BuildingEntity} from "./building.entity";
import {CreateBuildingDto} from "./utils/interfaces/create-building-dto";
import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {JwtGuard} from "../../guards/jwt/jwt.guard";
import {RolesGuard} from "../../guards/roles/roles.guard";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('buildings')
@Controller('buildings')
@UseGuards(RolesGuard)
export class BuildingsController {
    constructor(
        private buildingsService: BuildingsService
    ) {
    }

    @UseGuards(JwtGuard)
    @Post()
    public createBuilding(@Body() buildingBody: CreateBuildingDto): Promise<BuildingEntity> {
        return this.buildingsService.createBuilding(buildingBody)
    }

    @UseGuards(JwtGuard)
    @Get()
    public getBuildings(): Promise<BuildingEntity[]> {
        return this.buildingsService.getBuildings()
    }
}