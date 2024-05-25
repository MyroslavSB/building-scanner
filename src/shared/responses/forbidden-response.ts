import {ApiProperty} from "@nestjs/swagger";

export class ForbiddenResponse {
    @ApiProperty({example: 403})
    statusCode: number;

    @ApiProperty({example: 'Access denied: insufficient permissions'})
    message: string;

    @ApiProperty({example: 'Forbidden'})
    error: string
}