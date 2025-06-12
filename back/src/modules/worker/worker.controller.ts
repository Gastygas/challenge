import { Body, Controller, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { WorkerService } from "./worker.service";
import { WorkerDto } from "src/dtos/worker.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Workers")
@Controller("workers")
export class WorkerController {
    constructor(private readonly workerService: WorkerService) { }

    @Get()
    getAllWorkersController() {
        return this.workerService.getAllWorkersService()
    }

    @Get(":id")
    getWorkerByIdController(
        @Param() id: string
    ) {
        return this.workerService.getWorkerByIdService(id)
    }

    @Post()
    createNewWorkerController(
        @Body() newWorker: WorkerDto
    ) {
        return this.workerService.createNewWorkerService(newWorker)
    }

    @Put(":id")
    modifyWorkerController(
        @Param() id: string,
        @Body() newWorker: WorkerDto
    ) {
        return this.workerService.modifyWorkerService(id, newWorker)
    }

    @Patch(":id")
    disableWorkerController(
        @Param() id: string
    ) {
        return this.workerService.disableWorkerService(id)
    }
}