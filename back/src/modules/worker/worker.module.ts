import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerController } from "./worker.controller";
import { WorkerService } from "./worker.service";
import { Worker } from "src/entities/worker.entity";
import { WorkerRepository } from "./worker.respository";
import { Area } from "src/entities/area.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Worker, Area])],
    controllers: [WorkerController],
    providers: [WorkerService, WorkerRepository]
})
export class WorkerModule {}