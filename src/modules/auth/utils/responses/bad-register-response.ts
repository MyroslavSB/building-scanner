import {ApiProperty} from "@nestjs/swagger";

export class BadRegisterResponse {
    @ApiProperty({example: 400})
    statusCode: number;

    @ApiProperty({example: 'Email or username is already in use'})
    message: string;
}

export class BadRegisterUsernameResponse {
    @ApiProperty({example: 400})
    statusCode: number;

    @ApiProperty({example: 'Username is already in use'})
    message: string;
}