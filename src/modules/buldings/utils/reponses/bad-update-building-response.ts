import {ApiProperty} from "@nestjs/swagger";
import {EBadRequestMessages} from "../../../../shared/enums/e-bad-request-messages";

export class BadUpdateBuildingResponse {
    @ApiProperty({example: 400})
    statusCode: number;

    @ApiProperty({example: EBadRequestMessages.BAD_BUILDING_ID})
    message: string;

}