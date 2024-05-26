import {BuildingsService} from "./buildings.service";
import {BuildingEntity} from "./building.entity";
import {CreateBuildingDto} from "./utils/interfaces/create-building-dto";
import {Body, Controller, Get, Post, Patch, Delete, UseGuards, Param, Req} from "@nestjs/common";
import {JwtGuard} from "../../guards/jwt/jwt.guard";
import {RolesGuard} from "../../guards/roles/roles.guard";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {Roles} from "../../shared/decorators/roles.decorator";
import {EUserRoles} from "../users/utils/enums/e-user-roles";
import {VisitsService} from "../visits/visits.service";
import {BadCreateBuildingResponse} from "./utils/reponses/bad-create-building.response";
import {BadUpdateBuildingResponse} from "./utils/reponses/bad-update-building-response";
import {ForbiddenMessage} from "../../shared/error-messages/forbidden-message";
import {UnauthorizedMessage} from "../../shared/error-messages/unauthorized-message";
import {BuildingDto} from "../../shared/response-models/building-dto";
import {VisitEntity} from "../visits/visit.entity";

@ApiTags('buildings')
@ApiBearerAuth('access_token')
@ApiUnauthorizedResponse({ description: 'Unauthorized', type: UnauthorizedMessage })
@UseGuards(JwtGuard, RolesGuard)
@Controller('buildings')
export class BuildingsController {
    constructor(
        private buildingsService: BuildingsService,
        private visitsService: VisitsService
    ) {
    }

    @ApiBadRequestResponse({
        description: 'Bad Request',
        type: BadCreateBuildingResponse,
    })
    @ApiForbiddenResponse({
        description: 'Forbidden',
        type: ForbiddenMessage
    })
    @Roles(EUserRoles.ADMIN)
    @Post()
    public async createBuilding(@Body() buildingBody: CreateBuildingDto, @Req() req): Promise<BuildingDto> {
        return this.buildingsService.createBuilding(buildingBody, req.user)
    }

    @ApiBadRequestResponse({
        description: 'Bad Request',
        type: BadUpdateBuildingResponse,
    })
    @ApiForbiddenResponse({
        description: 'Forbidden',
        type: ForbiddenMessage
    })
    @Roles(EUserRoles.ADMIN)
    @Patch(':id')
    public updateBuilding(@Param('id') buildingId: number, @Body() buildingBody: CreateBuildingDto) {
        return this.buildingsService.updateBuilding(buildingId, buildingBody)
    }

    @ApiBadRequestResponse({
        description: 'Bad Request',
        type: BadUpdateBuildingResponse,
    })
    @ApiForbiddenResponse({
        description: 'Forbidden',
        type: ForbiddenMessage
    })
    @Roles(EUserRoles.ADMIN)
    @Delete(':id')
    public deleteBuilding(@Param('id') buildingId: number) {
        return this.buildingsService.deleteBuilding(buildingId)
    }

    @Get()
    public async getBuildings(@Req() user): Promise<BuildingEntity[]> {
        // const visits: VisitEntity[] = await this.visitsService.getUserVisits(user.id) || []

        return this.buildingsService.getBuildings()
    }

    @Get(':id')
    public getBuildingById(@Param('id') buildingId: number): Promise<BuildingEntity> {
        return this.buildingsService.getBuildingById(buildingId)
    }

}