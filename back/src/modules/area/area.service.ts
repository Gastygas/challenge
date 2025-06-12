import { Injectable } from "@nestjs/common";
import { AreaRepository } from "./area.repository";
import { AreaDto } from "src/dtos/area.dto";

@Injectable()
export class AreaService {
    constructor(
        private readonly areaRepository:AreaRepository,
    ){}
    async getAllAreasService(){
        try {
            return await this.areaRepository.getAllAreasRepository()
        } catch (error) {
            console.log(error);
            return error
        }
    }

    async createNewAreasService(newArea:AreaDto){
        try {
            return await this.areaRepository.createNewAreaRepository(newArea)
        } catch (error) {
            console.log(error);
            return error
        }
    }
}