import {ApiProperty} from "@nestjs/swagger";

export class ForbiddenMessage {
    @ApiProperty({example: 403})
    statusCode: number;

    @ApiProperty({example: 'Access denied: insufficient permissions'})
    message: string;
}