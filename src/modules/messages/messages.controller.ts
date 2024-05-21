import {MessagesService} from "./messages.service";
import {MessageEntity} from "./message.entity";
import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {CreateMessageDto} from "./utils/dto/create-message-dto";
import {ApiBearerAuth, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {JwtGuard} from "../../guards/jwt/jwt.guard";

@ApiTags('messages')
@ApiBearerAuth('access_token')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtGuard)
@Controller('messages')
export class MessagesController {
    constructor(
        private messagesService: MessagesService
    ) {
    }

    @Post()
    async createMessage(@Body() createMessageDto: CreateMessageDto): Promise<MessageEntity> {
        return this.messagesService.createMessage(createMessageDto, 1);
    }

    @Get()
    public getUsers(): Promise<MessageEntity[]> {
        return this.messagesService.getMessages()
    }
}