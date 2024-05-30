import {MessagesService} from "./messages.service";
import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    UseGuards,
    Req,
    Query,
    BadRequestException
} from "@nestjs/common";

import {CreateMessageDto} from "./utils/dto/create-message-dto";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {JwtGuard} from "../../guards/jwt/jwt.guard";
import {BuildingsService} from "../buldings/buildings.service";
import {NoSuchBuildingResponse} from "./utils/responses/no-such-building-response";
import {UnauthorizedMessage} from "../../shared/error-messages/unauthorized-message";
import {UnvisitedBuildingMessage} from "./utils/responses/unvisited-building.message";
import {MessageDto} from "../../shared/response-models/message-dto";
import {EBadRequestMessages} from "../../shared/enums/e-bad-request-messages";
import {BuildingDto} from "../../shared/response-models/building-dto";

@ApiTags('messages')
@ApiBearerAuth('access_token')
@ApiUnauthorizedResponse({description: 'Unauthorized', type: UnauthorizedMessage})
@UseGuards(JwtGuard)
@Controller('messages')
export class MessagesController {
    constructor(
        private messagesService: MessagesService,
        private buildingsService: BuildingsService
    ) {
    }

    @ApiBadRequestResponse({
        description: 'Bad Request',
        type: NoSuchBuildingResponse
    })
    @ApiForbiddenResponse({
        description: 'Forbidden',
        type: UnvisitedBuildingMessage
    })
    @Post() //Tested, all good
    async createMessage(@Body() createMessageDto: CreateMessageDto, @Req() req): Promise<MessageDto> {
        const building: BuildingDto = await this.buildingsService.getBuildingById(createMessageDto.building_id, req.user)

        if (!building) {
            throw new HttpException('Building with such id does not exist', HttpStatus.BAD_REQUEST);
        }

        return this.messagesService.createMessage(createMessageDto, req.user, building);
    }

    @ApiBadRequestResponse({
        description: 'Bad Request',
        type: NoSuchBuildingResponse
    })
    @Get() //Tested, all good
    public async getMessagesByBuilding(@Query('building_id') buildingId: number, @Req() req): Promise<MessageDto[]> {
        if (!buildingId || !(await this.buildingsService.getBuildingById(buildingId, req.user))) {
            throw new BadRequestException(EBadRequestMessages.BAD_BUILDING_ID)
        }
        return this.messagesService.getMessagesByBuilding(buildingId, req.user)
    }
}