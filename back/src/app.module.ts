import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrm from './config/typeOrm';
import { WorkerModule } from './modules/worker/worker.module';
import { AreaModule } from './modules/area/area.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeOrm] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm')
    }),
    WorkerModule,
    AreaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
