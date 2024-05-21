import {ApiProperty} from "@nestjs/swagger";

export class BadUpdateBuildingResponse {
    @ApiProperty({example: 400})
    statusCode: number;

    @ApiProperty({example: 'Building with such id is not registered'})
    message: string;

}