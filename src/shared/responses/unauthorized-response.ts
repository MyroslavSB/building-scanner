import {ApiProperty} from "@nestjs/swagger";

export class UnauthorizedResponse {
    @ApiProperty({example: 401})
    statusCode: number;

    @ApiProperty({example: 'Invalid or expired token'})
    message: string;
}