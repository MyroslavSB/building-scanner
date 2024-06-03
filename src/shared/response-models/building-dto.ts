import {ApiProperty} from "@nestjs/swagger";
import {UserDto} from "./user-dto";

export class BuildingDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty({
        type: 'json'
    })
    location: {
        latitude: number;
        longitude: number;
    }

    @ApiProperty()
    qr_code: string;

    @ApiProperty()
    created_at: string;

    @ApiProperty()
    updated_at: string;

    @ApiProperty()
    created_by: UserDto

    @ApiProperty()
    visits_count: number;

    @ApiProperty()
    visited: boolean;
}