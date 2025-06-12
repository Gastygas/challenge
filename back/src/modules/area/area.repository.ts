import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AreaDto } from "src/dtos/area.dto";
import { Area } from "src/entities/area.entity";
import { Repository } from "typeorm";

@Injectable()
export class AreaRepository {
    constructor (
        @InjectRepository(Area)
        private readonly areaRepository: Repository<Area>
    ){}

    async getAllAreasRepository(){
        return await this.areaRepository.find()
    }

    async createNewAreaRepository(newArea:AreaDto){
        const area = this.areaRepository.create(newArea)
        await this.areaRepository.save(area)
        return {success:"area created",area}
    }
}