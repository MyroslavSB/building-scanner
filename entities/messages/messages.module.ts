import {Module} from "@nestjs/common";
import {MessageEntity} from "./message.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MessagesController} from "./messages.controller";
import {MessagesService} from "./messages.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([MessageEntity])
    ],
    controllers: [MessagesController],
    providers: [MessagesService]
})
export class MessagesModule {

}