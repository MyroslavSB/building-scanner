import {MessagesService} from "./messages.service";
import {MessageEntity} from "./message.entity";
import {ICreateMessageBody} from "./utils/interfaces/i-create-message-body";
import {Body, Controller, Get, Post, UsePipes, ValidationPipe} from "@nestjs/common";
import {CreateMessageDto} from "./utils/dto/create-message-dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('messages')
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