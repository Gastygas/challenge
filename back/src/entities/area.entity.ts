import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Worker } from './worker.entity';

@Entity('areas')
export class Area {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  name: string;

  @OneToMany(() => Worker, (worker) => worker.area)
  workers: Worker[];
}