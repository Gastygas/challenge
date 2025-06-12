import { Injectable } from "@nestjs/common";
import { WorkerRepository } from "./worker.respository";
import { WorkerDto } from "src/dtos/worker.dto";

@Injectable()
export class WorkerService {

    constructor(private readonly workersRepository: WorkerRepository) { }

    async getAllWorkersService() {
        try {
            return await this.workersRepository.getAllWorkersRepository()
        } catch (error) {
            console.log(error);
            return error
        }
    }
    async getWorkerByIdService(id: string) {
        try {
            return await this.workersRepository.getWorkerByIdRepository(id)
        } catch (error) {
            console.log(error);
            return error
        }
    }

    async createNewWorkerService(newWorker: WorkerDto) {
        try {
            return await this.workersRepository.createNewWorkerRepository(newWorker)
        } catch (error) {
            console.log(error);
            return error
        };
    }

    async modifyWorkerService(id: string, newWorker: WorkerDto) {
        try {
            return await this.workersRepository.modifyWorkerRepository(id, newWorker)
        } catch (error) {
            console.log(error);
            return error
        };
    }

    async disableWorkerService(id: string) {
        try {
            return await this.workersRepository.disableWorkerRepository(id)
        } catch (error) {
            console.log(error);
            return error
        };
    }
}