import {Module} from "@nestjs/common";
import {VisitEntity} from "./visit.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {VisitsController} from "./visits.controller";
import {VisitsService} from "./visits.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([VisitEntity])
    ],
    controllers: [VisitsController],
    providers: [VisitsService]
})
export class VisitsModule {

}