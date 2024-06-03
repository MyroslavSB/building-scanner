import {UserDto} from "./user-dto";
import {VisitDto} from "./visit-dto";
import {ApiProperty} from "@nestjs/swagger";

export class AchievementDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    obtained_date: string;

    @ApiProperty()
    title: string;
    
    @ApiProperty()
    description: string;

    @ApiProperty()
    user: UserDto;

    @ApiProperty()
    visit: VisitDto;
}