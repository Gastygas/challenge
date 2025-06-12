import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WorkerDto } from "src/dtos/worker.dto";
import { Area } from "src/entities/area.entity";
import { Worker } from "src/entities/worker.entity";
import { Repository } from "typeorm";

@Injectable()
export class WorkerRepository {

    constructor(
        @InjectRepository(Worker)
        private readonly workerRepository: Repository<Worker>,
        @InjectRepository(Area)
        private readonly areaRepository: Repository<Area>
    ) { }

    async getAllWorkersRepository() {
        const workers = await this.workerRepository.find({ where: { status: true } })
        return { success: "workers found", workers };
    }

    async getWorkerByIdRepository(id: string) {
        const worker = await this.workerRepository.find({ where: { id } })
        if (!worker) throw new BadRequestException("worker not found")
        return { success: "worker found", worker };
    }

    async createNewWorkerRepository(newWorker: WorkerDto) {
        const area = await this.areaRepository.findOne({
            where: { id: newWorker.area_id },
        });
        if (!area) throw new Error('Área no encontrada');

        const worker = this.workerRepository.create({ ...newWorker, area })
        await this.workerRepository.save(worker)
        return { success: "worker has been created", worker }
    }

    //modificar el area de trabajo solamente

    async modifyWorkerRepository(id: string, workerModifed: WorkerDto) {
        const oldWorker = await this.workerRepository.find({ where: { id } })
        if (!oldWorker) throw new BadRequestException("worker not found")

        const worker = await this.workerRepository.update(oldWorker, workerModifed)
        return { success: "worker has been modifed", worker }
    }

    async disableWorkerRepository(id: string) {
        const findWorker = await this.workerRepository.findOneBy({ id })
        if (!findWorker) throw new BadRequestException("worker not found")
        findWorker.status = false
        await this.workerRepository.save(findWorker)

        return { success: "worker is disabled", worker: findWorker }

    }
}