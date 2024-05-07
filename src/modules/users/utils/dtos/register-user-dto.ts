import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RegisterUserDto {

    @ApiProperty({
        default: 'hello@world.com',
        required: true
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        default: 'student_scanner',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    username: string;

    @ApiProperty({
        default: '********',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}