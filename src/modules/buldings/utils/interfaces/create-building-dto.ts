import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

class BuildingLocation {
    @ApiProperty({
        example: 51.107883,
        default: 51.107883,
        description: 'Building latitude'
    })
    @IsNumber()
    latitude: number = 51.107883;

    @ApiProperty({
        example: 17.038538,
        default: 17.038538,
        description: 'Building longitude'
    })
    @IsNumber()
    longitude: number = 17.038538;
}

export class CreateBuildingDto {

    @ApiProperty({
        default: 'Some building name',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        default: 'Some building description',
        required: false
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: 'Building location'
    })
    @Type(() => BuildingLocation)
    @ValidateNested()
    @IsOptional()
    location?: BuildingLocation;
}

