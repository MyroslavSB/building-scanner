import {Module} from "@nestjs/common";
import {MessageEntity} from "./message.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MessagesController} from "./messages.controller";
import {MessagesService} from "./messages.service";
import {UsersModule} from "../users/users.module";
import {BuildingsModule} from "../buldings/buildings.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([MessageEntity]),
        UsersModule,
        BuildingsModule
    ],
    controllers: [MessagesController],
    providers: [MessagesService]
})
export class MessagesModule {

}