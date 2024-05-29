import {ApiProperty} from "@nestjs/swagger";
import {BuildingDto} from "./building-dto";
import {AchievementEntity} from "../../modules/achievements/achievement.entity";
import {UserDto} from "./user-dto";

export class VisitDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    visit_date: string;

    @ApiProperty()
    achievement: AchievementEntity

    @ApiProperty()
    user: UserDto

    @ApiProperty()
    building: BuildingDto
}