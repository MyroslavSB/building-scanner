import {MessagesService} from "./messages.service";
import {MessageEntity} from "./message.entity";

import {Body, Controller, Get, HttpException, HttpStatus, Post, Param, UseGuards, Req} from "@nestjs/common";

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
import {ForbiddenMessage} from "../../shared/error-messages/forbidden-message";
import {UnauthorizedMessage} from "../../shared/error-messages/unauthorized-message";
import {UnvisitedBuildingMessage} from "./utils/responses/unvisited-building.message";
import {MessageDto} from "../../shared/response-models/message-dto";
import {UserEntity} from "../users/user.entity";

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
        const building = await this.buildingsService.getBuildingById(createMessageDto.building_id, req.user)

        if (!building) {
            throw new HttpException('Building with such id does not exist', HttpStatus.BAD_REQUEST);
        }

        return this.messagesService.createMessage(createMessageDto, req.user, building);
    }

    @Get(':id')
    public getMessagesByBuilding(@Param('id') buildingId: number, @Req() req): Promise<MessageDto[]> {
        return this.messagesService.getMessagesByBuilding(buildingId, req.user)
    }
}