import {ApiProperty} from "@nestjs/swagger";

export class BadLoginResponse {
    @ApiProperty({example: 400})
    statusCode: number;

    @ApiProperty({example: 'Invalid credentials'})
    message: string;
}