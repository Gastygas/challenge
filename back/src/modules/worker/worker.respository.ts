import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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
        const workers = await this.workerRepository.find()
        return { success: "workers found", workers };
    }

    async getWorkerByIdRepository(id: string) {
        const worker = await this.workerRepository.findOne({ where: { id, status: true } })
        if (!worker) throw new NotFoundException("worker not found")
        return { success: "worker found", worker };
    }

    async createNewWorkerRepository(newWorker: WorkerDto) {
        const area = await this.areaRepository.findOne({
            where: { id: newWorker.area_id },
        });
        if (!area) throw new NotFoundException("Área no encontrada");

        const workerExists = await this.workerRepository.findOne({where:{dni:newWorker.dni}})
        if(workerExists) throw new BadRequestException("Worker DNI is already used")

        const worker = this.workerRepository.create({ ...newWorker, area })
        await this.workerRepository.save(worker)
        return { success: "worker has been created", worker }
    }

    //modificar el area de trabajo solamente

    async modifyWorkerRepository(id: string, workerModified: WorkerDto) {
        const worker = await this.workerRepository.findOne({ where: { id } });
        if (!worker) throw new NotFoundException("Worker not found");

        const area = await this.areaRepository.findOne({ where: { id: workerModified.area_id } });
        if (!area) throw new NotFoundException("Área no encontrada");

        const updated = Object.assign(worker, { ...workerModified, area });
        await this.workerRepository.save(updated);

        return { success: "worker has been modified", worker: updated };
    }

    async disableOrEnableWorkerRepository(id: string) {
        const findWorker = await this.workerRepository.findOneBy({ id })
        if (!findWorker) throw new BadRequestException("worker not found")
        findWorker.status = !findWorker.status
        await this.workerRepository.save(findWorker)

        return { success: "worker status changed", worker: findWorker }

    }

    async deleteWorkerRepository(id: string) {
        const findWorker = await this.workerRepository.findOneBy({ id })
        if (!findWorker) throw new BadRequestException("worker not found")
        
        await this.workerRepository.delete(id)

        return { success: "worker is disabled", worker: findWorker }

    }
}