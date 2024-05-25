import {ApiProperty} from "@nestjs/swagger";


export class BadVisitResponse {
    @ApiProperty({example: 400})
    statusCode: number;

    @ApiProperty({example: 'Such building doesn\'t exist'})
    message: string;
}