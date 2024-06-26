import {Module} from "@nestjs/common";
import {VisitEntity} from "./visit.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {VisitsController} from "./visits.controller";
import {VisitsService} from "./visits.service";
import {AchievementsModule} from "../achievements/achievements.module";
import {BuildingsModule} from "../buldings/buildings.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([VisitEntity]),
        BuildingsModule,
        AchievementsModule,
    ],
    controllers: [VisitsController],
    providers: [VisitsService]
})
export class VisitsModule {

}