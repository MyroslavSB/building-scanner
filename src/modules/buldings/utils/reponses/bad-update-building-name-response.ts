import {ApiProperty} from "@nestjs/swagger";
import {EBadRequestMessages} from "../../../../shared/enums/e-bad-request-messages";

export class BadUpdateBuildingNameResponse {
    @ApiProperty({example: 409})
    statusCode: number;

    @ApiProperty({example: EBadRequestMessages.EXISTING_BUILDING_NAME})
    message: string;

}