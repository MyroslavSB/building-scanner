import {forwardRef, Module} from "@nestjs/common";
import {MessagesController} from "../messages/messages.controller";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        forwardRef(() => UsersModule)
    ],
    controllers: [MessagesController],
    providers: [MessagesController],
})
export class RankingsModule {}