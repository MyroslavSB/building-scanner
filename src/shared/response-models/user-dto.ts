import {EUserRoles} from "../../modules/users/utils/enums/e-user-roles";
import {ApiProperty} from "@nestjs/swagger";

export class UserDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    role: EUserRoles;

    @ApiProperty()
    visits_count: number;

    @ApiProperty()
    created_buildings_count: number;

}