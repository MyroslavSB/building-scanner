import {IsNotEmpty, IsUUID} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class PromoteUserDto {
    @ApiProperty({
        default: 1,
        required: true
    })
    @IsNotEmpty()
    userId: number;

}