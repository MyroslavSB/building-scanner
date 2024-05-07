import {BuildingsService} from "./buildings.service";
import {BuildingEntity} from "./building.entity";
import {CreateBuildingDto} from "./utils/interfaces/create-building-dto";
import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {JwtGuard} from "../../guards/jwt/jwt.guard";
import {RolesGuard} from "../../guards/roles/roles.guard";
import {ApiTags} from "@nestjs/swagger";
import {Roles} from "../../shared/decorators/roles.decorator";
import {EUserRoles} from "../users/utils/enums/e-user-roles";

@ApiTags('buildings')
@UseGuards(JwtGuard, RolesGuard)
@Controller('buildings')
export class BuildingsController {
    constructor(
        private buildingsService: BuildingsService
    ) {
    }

    @Roles(EUserRoles.ADMIN)
    @Post()
    public createBuilding(@Body() buildingBody: CreateBuildingDto): Promise<BuildingEntity> {
        return this.buildingsService.createBuilding(buildingBody)
    }

    @Get()
    public getBuildings(): Promise<BuildingEntity[]> {
        return this.buildingsService.getBuildings()
    }
}