import {ApiProperty} from "@nestjs/swagger";
import {EBadRequestMessages} from "../../../../shared/enums/e-bad-request-messages";

export class UnvisitedBuildingMessage {
    @ApiProperty({example: 403})
    statusCode: number;

    @ApiProperty({example: EBadRequestMessages.UNVISITED_BUILDING})
    message: string;
}