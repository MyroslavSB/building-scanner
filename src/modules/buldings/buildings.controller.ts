import {BuildingsService} from "./buildings.service";
import {BuildingEntity} from "./building.entity";
import {CreateBuildingDto} from "./utils/interfaces/create-building-dto";
import {Body, Controller, Get, Post, Patch, Delete, UseGuards, Param, Req, BadRequestException} from "@nestjs/common";
import {JwtGuard} from "../../guards/jwt/jwt.guard";
import {RolesGuard} from "../../guards/roles/roles.guard";
import {
    ApiBadRequestResponse,
    ApiBearerAuth, ApiConflictResponse,
    ApiForbiddenResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {Roles} from "../../shared/decorators/roles.decorator";
import {EUserRoles} from "../users/utils/enums/e-user-roles";
import {BadCreateBuildingResponse} from "./utils/reponses/bad-create-building.response";
import {BadUpdateBuildingResponse} from "./utils/reponses/bad-update-building-response";
import {ForbiddenMessage} from "../../shared/error-messages/forbidden-message";
import {UnauthorizedMessage} from "../../shared/error-messages/unauthorized-message";
import {BuildingDto} from "../../shared/response-models/building-dto";
import {BadUpdateBuildingNameResponse} from "./utils/reponses/bad-update-building-name-response";
import {VisitsService} from "../visits/visits.service";
import {MessagesService} from "../messages/messages.service";
import {EBadRequestMessages} from "../../shared/enums/e-bad-request-messages";


@ApiTags('buildings')
@ApiBearerAuth('access_token')
@ApiUnauthorizedResponse({ description: 'Unauthorized', type: UnauthorizedMessage })
@UseGuards(JwtGuard, RolesGuard)
@Controller('buildings')
export class BuildingsController {
    constructor(
        private buildingsService: BuildingsService,
        private visitsService: VisitsService,
        private messagesService: MessagesService
    ) {
    }


    @ApiBadRequestResponse({
        description: 'Bad Request',
        type: BadCreateBuildingResponse
    })
    @ApiForbiddenResponse({
        description: 'Forbidden',
        type: ForbiddenMessage
    })
    @Roles(EUserRoles.ADMIN)
    @Post()  //Tested, all good
    public async createBuilding(@Body() buildingBody: CreateBuildingDto, @Req() req): Promise<BuildingDto> {
        return this.buildingsService.createBuilding(buildingBody, req.user)
    }

    @Get()  //Tested, all good
    public async getBuildings(@Req() req): Promise<BuildingDto[]> {
        return this.buildingsService.getBuildings(req.user)
    }

    @Get('created')  //Tested, all good
    public async getUserBuildings(@Req() req): Promise<BuildingDto[]> {
        return this.buildingsService.getUserBuildings(req.user)
    }

    @ApiBadRequestResponse({
        description: 'Bad Request',
        type: BadUpdateBuildingResponse,
    })
    @ApiForbiddenResponse({
        description: 'Forbidden',
        type: ForbiddenMessage
    })
    @ApiConflictResponse({
        description: '',
        type: BadUpdateBuildingNameResponse
    })
    @Roles(EUserRoles.ADMIN)
    @Patch(':id') // Tested, all good
    public async updateBuilding(@Param('id') buildingId: number, @Body() buildingBody: CreateBuildingDto, @Req() req): Promise<BuildingDto> {
        return this.buildingsService.updateBuilding(buildingId, buildingBody, req.user)
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
    @Delete(':id')  //Tested, all good
    public async deleteBuilding(@Param('id') buildingId: number, @Req() req): Promise<void> {

        const building: BuildingEntity = await this.buildingsService.getBuildingWithRelations(buildingId)

        if (!building) {
            throw new BadRequestException(EBadRequestMessages.BAD_BUILDING_ID);
        }

        await this.visitsService.deleteBuildingVisits(building)
        await this.messagesService.deleteBuildingMessages(buildingId)
        await this.buildingsService.deleteBuilding(buildingId, req.user)
        return
    }



    @Get(':id')  //finished request
    public getBuildingById(@Param('id') buildingId: number, @Req() req): Promise<BuildingDto> {
        return this.buildingsService.getBuildingById(buildingId, req.user)
    }

}