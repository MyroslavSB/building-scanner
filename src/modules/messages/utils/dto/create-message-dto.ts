import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateMessageDto {

    @ApiProperty({
        default: 'Message text',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    text: string;

    @ApiProperty({
        default: 1,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    building_id: number;
}