import {IsNotEmpty, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UserLoginDto {
    @ApiProperty({
        default: 'gigg.chad@gmail.com',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    email: string;


    @ApiProperty({
        default: 'rootroot',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string
}