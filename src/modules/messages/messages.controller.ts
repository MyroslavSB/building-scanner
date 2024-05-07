import {MessagesService} from "./messages.service";
import {MessageEntity} from "./message.entity";
import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {CreateMessageDto} from "./utils/dto/create-message-dto";
import {ApiTags} from "@nestjs/swagger";
import {JwtGuard} from "../../guards/jwt/jwt.guard";

@ApiTags('messages')
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