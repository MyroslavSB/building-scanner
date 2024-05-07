import {Module} from "@nestjs/common";
import {AchievementEntity} from "./achievement.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AchievementsController} from "./achievements.controller";
import {AchievementsService} from "./achievements.service";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([AchievementEntity]),
        UsersModule
    ],
    controllers: [AchievementsController],
    providers: [AchievementsService],
    exports: [AchievementsService]
})
export class AchievementsModule {

}