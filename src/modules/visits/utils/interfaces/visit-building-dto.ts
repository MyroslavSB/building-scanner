import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber} from "class-validator";

export class VisitBuildingDto {
    @ApiProperty({
        default: 1,
        required: true
    })
    @IsNumber()
    @IsNotEmpty()
    building_id: number;
}

