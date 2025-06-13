import { Injectable } from "@nestjs/common";
import { AreaRepository } from "./area.repository";
import { AreaDto } from "src/dtos/area.dto";

@Injectable()
export class AreaService {
    constructor(
        private readonly areaRepository: AreaRepository,
    ) { }
    async getAllAreasService() {
        return await this.areaRepository.getAllAreasRepository()
    }

    async createNewAreasService(newArea: AreaDto) {
        return await this.areaRepository.createNewAreaRepository(newArea)
    }

    async initDefaultAreasService() {
        return this.areaRepository.initDefaultAreasRepository();
    }
}