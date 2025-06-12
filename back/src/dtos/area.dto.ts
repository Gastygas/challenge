import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AreaDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example:""})
    name:string

    id?:string
}