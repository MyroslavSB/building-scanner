import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UserLoginDto {
    @ApiProperty({
        default: 'hello@world.com',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    username: string;


    @ApiProperty({
        default: 'student2008',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string
}