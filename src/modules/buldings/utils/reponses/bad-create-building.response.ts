import {ApiProperty} from "@nestjs/swagger";

export class BadCreateBuildingResponse {
    @ApiProperty({example: 400})
    statusCode: number;

    @ApiProperty({example: 'Building with such name has already been registered'})
    message: string;

}