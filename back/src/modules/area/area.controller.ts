import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AreaService } from "./area.service";
import { AreaDto } from "src/dtos/area.dto";

@ApiTags('areas')
@Controller('areas')
export class AreaController {
    constructor(
        private readonly areaService:AreaService
    ){}
    @Get()
    getAllAreasController() {
        return this.areaService.getAllAreasService()
    }

    @Post()
    createNewAreaController(
        @Body() newArea: AreaDto
    ){
        return this.areaService.createNewAreasService(newArea)
    }
}