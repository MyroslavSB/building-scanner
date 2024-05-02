import {BuildingsService} from "./buildings.service";
import {BuildingEntity} from "./building.entity";
import {ICreateBuildingBody} from "./utils/interfaces/i-create-building-body";
import {Body, Controller, Get, Post} from "@nestjs/common";

@Controller('buildings')
export class BuildingsController {
    constructor(
        private usersService: BuildingsService
    ) {
    }

    @Post()
    public createUser(@Body() user_body: ICreateBuildingBody): Promise<BuildingEntity> {
        return this.usersService.createUser(user_body)
    }

    @Get()
    public getUsers(): Promise<BuildingEntity[]> {
        return this.usersService.getUsers()
    }
}