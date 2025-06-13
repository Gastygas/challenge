import { Body, Controller, Get, HttpCode, Post, Query, UnauthorizedException } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { AreaService } from "./area.service";
import { AreaDto } from "src/dtos/area.dto";

@ApiTags('areas')
@Controller('areas')
export class AreaController {
    constructor(
        private readonly areaService: AreaService
    ) { }

    @Get()
    getAllAreasController() {
        return this.areaService.getAllAreasService()
    }

    @Post()
    createNewAreaController(
        @Body() newArea: AreaDto
    ) {
        return this.areaService.createNewAreasService(newArea)
    }

    @Post('init')
    @HttpCode(201)
    @ApiQuery({name:'key', required:true, description: 'Clave secreta para inicializar las áreas'})
    initDefaultAreasController(@Query('key') key: string) {
    if (key !== process.env.INIT_SECRET) {
        throw new UnauthorizedException('Clave inválida');
    }
    return this.areaService.initDefaultAreasService();
}
}