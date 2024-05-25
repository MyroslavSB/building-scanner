import {MessagesService} from "./messages.service";
import {MessageEntity} from "./message.entity";

import {Body, Controller, Get, HttpException, HttpStatus, Post, Param, UseGuards} from "@nestjs/common";

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

@ApiTags('messages')
@ApiBearerAuth('access_token')
@ApiUnauthorizedResponse({description: 'Unauthorized', type: UnauthorizedMessage})
@ApiForbiddenResponse({description: 'Forbidden', type: ForbiddenMessage})
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
    @Post()
    async createMessage(@Body() createMessageDto: CreateMessageDto): Promise<MessageEntity> {
        const building = await this.buildingsService.getBuildingById(createMessageDto.building_id)

        if (!building) {
            throw new HttpException('Building with such id does not exist', HttpStatus.BAD_REQUEST);
        }

        return this.messagesService.createMessage(createMessageDto, 1);
    }

    @Get()
    public getUsers(): Promise<MessageEntity[]> {
        return this.messagesService.getMessages()
    }

    @Get(':id')
    public getMessagesByBuilding(@Param('id') buildingId: number): Promise<MessageEntity[]> {
        return this.messagesService.getMessagesByBuilding(buildingId)
    }
}