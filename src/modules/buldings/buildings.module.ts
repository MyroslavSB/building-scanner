import {Module} from "@nestjs/common";
import {BuildingEntity} from "./building.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BuildingsController} from "./buildings.controller";
import {BuildingsService} from "./buildings.service";
import {UsersModule} from "../users/users.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([BuildingEntity]),
        UsersModule
    ],
    controllers: [BuildingsController],
    providers: [BuildingsService],
    exports: [BuildingsService]
})
export class BuildingsModule {

}