import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString,  } from "class-validator";

export class WorkerDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:"juan"})
    name: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:"lopez"})
    last_name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:"17/08/2004"})
    birthdate: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:"42234567"})
    dni: string;

    @ApiProperty({example:false})
    is_developer?: boolean;

    @ApiProperty({example:"aca puede ir una descripcion de quien es juan lopez"})
    about?: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:""})
    area_id:string;
}