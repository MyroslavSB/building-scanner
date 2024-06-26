import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateMessageDto {
    @IsNotEmpty()
    @IsString()
    text: string;

    @IsNotEmpty()
    @IsNumber()
    building_id: number;


}