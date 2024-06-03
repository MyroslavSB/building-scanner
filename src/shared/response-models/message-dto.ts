import {ApiProperty} from "@nestjs/swagger";
import {UserDto} from "./user-dto";
import {BuildingDto} from "./building-dto";

export class MessageDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    text: string;

    @ApiProperty()
    user: UserDto;

    @ApiProperty()
    building: BuildingDto;

    @ApiProperty()
    created_at: Date | string;
}