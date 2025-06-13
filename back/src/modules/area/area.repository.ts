import { BadRequestException, Injectable } from "@nestjs/common";
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

async initDefaultAreasRepository() {
    const defaultAreas = [
        { name: 'Administracion' },
        { name: 'Desarrollo' },
        { name: 'Recursos Humanos' },
        { name: 'Marketing' },
        { name: 'Soporte Técnico' },
    ];

    const existing = await this.areaRepository.find();
    if (existing.length > 0) {
        throw new BadRequestException('Ya existen áreas creadas');
    }

    const areas = this.areaRepository.create(defaultAreas);
    await this.areaRepository.save(areas);
    return { success: 'Áreas creadas correctamente', areas };
}

}