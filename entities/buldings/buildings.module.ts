import {Module} from "@nestjs/common";
import {BuildingEntity} from "./building.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BuildingsController} from "./buildings.controller";
import {BuildingsService} from "./buildings.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([BuildingEntity])
    ],
    controllers: [BuildingsController],
    providers: [BuildingsService],
    exports: [BuildingsService]
})
export class BuildingsModule {

}