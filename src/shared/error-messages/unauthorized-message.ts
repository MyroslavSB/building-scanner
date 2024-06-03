import {ApiProperty} from "@nestjs/swagger";
import {EUnauthorizedResponses} from "../enums/e-unauthorized-responses";

export class UnauthorizedMessage {
    @ApiProperty({
        example: 401,
        description: 'The HTTP status code indicating that the request requires user authentication.'
    })
    statusCode: number;

    @ApiProperty({
        example: EUnauthorizedResponses.UNAUTHORIZED,
        description: 'A message indicating that the token provided is either invalid or has expired.'
    })
    message: string;

    @ApiProperty({
        example: 'Unauthorized',
        description: 'A message indicating that the token provided is either invalid or has expired.'
    })
    error: string;
}