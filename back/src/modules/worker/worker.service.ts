import { Injectable } from "@nestjs/common";
import { WorkerRepository } from "./worker.respository";
import { WorkerDto } from "src/dtos/worker.dto";

@Injectable()
export class WorkerService {

    constructor(private readonly workersRepository: WorkerRepository) { }

    async getAllWorkersService() {
        return await this.workersRepository.getAllWorkersRepository()
    }
    async getWorkerByIdService(id: string) {
        return await this.workersRepository.getWorkerByIdRepository(id)
    }

    async createNewWorkerService(newWorker: WorkerDto) {
        return await this.workersRepository.createNewWorkerRepository(newWorker)
    }

    async modifyWorkerService(id: string, newWorker: WorkerDto) {
        return await this.workersRepository.modifyWorkerRepository(id, newWorker)

    }

    async disableOrEnableWorkerService(id: string) {
        return await this.workersRepository.disableOrEnableWorkerRepository(id)
    }

    async deleteWorkerService(id: string) {
        return await this.workersRepository.deleteWorkerRepository(id)
    }
}