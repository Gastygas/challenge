import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put } from "@nestjs/common";
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
        @Param("id") id: string
    ) {
        return this.workerService.getWorkerByIdService(id)
    }

    @Post()
    @HttpCode(201)
    createNewWorkerController(
        @Body() newWorker: WorkerDto
    ) {
        return this.workerService.createNewWorkerService(newWorker)
    }

    @Put(":id")
    modifyWorkerController(
        @Param("id") id: string,
        @Body() newWorker: WorkerDto
    ) {
        return this.workerService.modifyWorkerService(id, newWorker)
    }

    @Patch("status/:id")
    disableOrEnableWorkerController(
        @Param("id") id: string
    ) {
        return this.workerService.disableOrEnableWorkerService(id)
    }

    @Delete(":id")
    deleteWorkerController(
        @Param("id") id: string
    ) {
        return this.workerService.deleteWorkerService(id)
    }
}