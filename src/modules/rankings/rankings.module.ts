import {forwardRef, Module} from "@nestjs/common";
import {UsersModule} from "../users/users.module";
import {RankingsController} from "./rankings.controller";

@Module({
    imports: [
        forwardRef(() => UsersModule)
    ],
    controllers: [RankingsController],
    providers: [RankingsController],
})
export class RankingsModule {}