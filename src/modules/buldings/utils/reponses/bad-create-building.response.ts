import {ApiProperty} from "@nestjs/swagger";
import {EBadRequestMessages} from "../../../../shared/enums/e-bad-request-messages";

export class BadCreateBuildingResponse {
    @ApiProperty({example: 400})
    statusCode: number;

    @ApiProperty({example: EBadRequestMessages.EXISTING_BUILDING_NAME})
    message: string;

}