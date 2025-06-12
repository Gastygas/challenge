import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Area } from "src/entities/area.entity";
import { AreaController } from "./area.controller";
import { AreaService } from "./area.service";
import { AreaRepository } from "./area.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Area])],
    controllers: [AreaController],
    providers: [AreaService, AreaRepository]
})
export class AreaModule { }