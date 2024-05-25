import {forwardRef, Module} from "@nestjs/common";
import {VisitEntity} from "./visit.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {VisitsController} from "./visits.controller";
import {VisitsService} from "./visits.service";
import {AchievementsModule} from "../achievements/achievements.module";
import {BuildingsModule} from "../buldings/buildings.module";
import {UsersModule} from "../users/users.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([VisitEntity]),
        forwardRef(() => BuildingsModule),
        AchievementsModule,
        UsersModule
    ],
    controllers: [VisitsController],
    providers: [VisitsService],
    exports: [VisitsService]
})
export class VisitsModule {

}